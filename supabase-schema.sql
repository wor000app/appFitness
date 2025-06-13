-- =============================================
-- SUPABASE DATABASE SCHEMA FOR FITNESS APP
-- =============================================

-- Enable Row Level Security
ALTER DATABASE postgres SET row_security = on;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS AND PROFILES
-- =============================================

-- Extend Supabase auth.users with custom profile data
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(255),
  avatar_url TEXT,
  bio TEXT,
  date_of_birth DATE,
  gender VARCHAR(20),
  height_cm INTEGER,
  weight_kg DECIMAL(5,2),
  fitness_level VARCHAR(20) CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced')),
  goals TEXT[],
  daily_step_goal INTEGER DEFAULT 10000,
  daily_steps INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_workouts INTEGER DEFAULT 0,
  preferred_units VARCHAR(10) DEFAULT 'metric', -- metric/imperial
  timezone VARCHAR(50) DEFAULT 'UTC',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- WORKOUT PROTOCOLS AND ROUTINES
-- =============================================

-- Workout protocols (like "PROTOCOLO HIPERTROFIA")
CREATE TABLE public.workout_protocols (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  level VARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  icon VARCHAR(10), -- emoji
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Individual workouts within protocols
CREATE TABLE public.workouts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  protocol_id UUID REFERENCES public.workout_protocols(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  muscle_groups TEXT[], -- ['chest', 'biceps', 'back', etc.]
  estimated_duration_minutes INTEGER,
  difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
  order_in_protocol INTEGER,
  is_template BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- EXERCISES
-- =============================================

-- Exercise database (can be global or user-specific)
CREATE TABLE public.exercises (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, -- NULL for global exercises
  name VARCHAR(255) NOT NULL,
  description TEXT,
  instructions TEXT,
  muscle_groups TEXT[], -- primary and secondary muscle groups
  equipment TEXT[], -- equipment needed
  difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
  video_url TEXT,
  image_url TEXT,
  is_public BOOLEAN DEFAULT false, -- if user can share with others
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercises within specific workouts
CREATE TABLE public.workout_exercises (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workout_id UUID REFERENCES public.workouts(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES public.exercises(id) ON DELETE CASCADE,
  order_in_workout INTEGER NOT NULL,
  target_sets INTEGER,
  target_reps VARCHAR(50), -- "8-12", "10", "AMRAP", etc.
  target_weight_kg DECIMAL(6,2),
  target_rest_seconds INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- WORKOUT SESSIONS AND TRACKING
-- =============================================

-- Actual workout sessions (when user performs a workout)
CREATE TABLE public.workout_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  workout_id UUID REFERENCES public.workouts(id) ON DELETE SET NULL,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'cancelled')),
  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5), -- user rating of workout
  calories_burned INTEGER,
  average_heart_rate INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Individual exercise performance within a session
CREATE TABLE public.exercise_sets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES public.workout_sessions(id) ON DELETE CASCADE,
  workout_exercise_id UUID REFERENCES public.workout_exercises(id) ON DELETE CASCADE,
  set_number INTEGER NOT NULL,
  reps INTEGER,
  weight_kg DECIMAL(6,2),
  rest_seconds INTEGER,
  rpe INTEGER CHECK (rpe >= 1 AND rpe <= 10), -- Rate of Perceived Exertion
  is_completed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- GOALS AND ACHIEVEMENTS
-- =============================================

-- User goals (monthly, weekly, etc.)
CREATE TABLE public.goals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'workout_frequency', 'weight_target', 'strength', etc.
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_value DECIMAL(10,2),
  current_value DECIMAL(10,2) DEFAULT 0,
  unit VARCHAR(20), -- 'kg', 'workouts', 'days', etc.
  start_date DATE NOT NULL,
  target_date DATE NOT NULL,
  is_achieved BOOLEAN DEFAULT false,
  achieved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements/badges system
CREATE TABLE public.achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(10), -- emoji
  category VARCHAR(50), -- 'streak', 'strength', 'endurance', etc.
  requirement_type VARCHAR(50), -- 'workout_count', 'streak_days', 'weight_lifted', etc.
  requirement_value INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements
CREATE TABLE public.user_achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- =============================================
-- SOCIAL FEATURES
-- =============================================

-- Friend relationships
CREATE TABLE public.friendships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  requester_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  addressee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(requester_id, addressee_id),
  CONSTRAINT no_self_friendship CHECK (requester_id != addressee_id)
);

-- Workout sharing and social interactions
CREATE TABLE public.workout_shares (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.workout_sessions(id) ON DELETE CASCADE,
  caption TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Likes/reactions on shared workouts
CREATE TABLE public.workout_reactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  share_id UUID REFERENCES public.workout_shares(id) ON DELETE CASCADE,
  reaction_type VARCHAR(20) DEFAULT 'like' CHECK (reaction_type IN ('like', 'fire', 'strong', 'celebrate')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, share_id)
);

-- Comments on shared workouts
CREATE TABLE public.workout_comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  share_id UUID REFERENCES public.workout_shares(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- BODY MEASUREMENTS AND PROGRESS
-- =============================================

-- Body measurements tracking
CREATE TABLE public.body_measurements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  weight_kg DECIMAL(5,2),
  body_fat_percentage DECIMAL(4,2),
  muscle_mass_kg DECIMAL(5,2),
  body_water_percentage DECIMAL(4,2),
  chest_cm DECIMAL(5,2),
  waist_cm DECIMAL(5,2),
  hips_cm DECIMAL(5,2),
  bicep_cm DECIMAL(5,2),
  thigh_cm DECIMAL(5,2),
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT
);

-- Progress photos
CREATE TABLE public.progress_photos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  photo_type VARCHAR(20) CHECK (photo_type IN ('front', 'side', 'back', 'other')),
  taken_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT
);

-- =============================================
-- NUTRITION TRACKING (BASIC)
-- =============================================

-- Daily nutrition summary
CREATE TABLE public.nutrition_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  calories INTEGER,
  protein_g DECIMAL(6,2),
  carbs_g DECIMAL(6,2),
  fat_g DECIMAL(6,2),
  water_ml INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- =============================================
-- TIMER AND SETTINGS
-- =============================================

-- User timer presets
CREATE TABLE public.timer_presets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  work_seconds INTEGER NOT NULL,
  rest_seconds INTEGER NOT NULL,
  rounds INTEGER NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- App settings and preferences
CREATE TABLE public.user_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  setting_key VARCHAR(100) NOT NULL,
  setting_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, setting_key)
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Profile indexes
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_updated_at ON public.profiles(updated_at);

-- Workout indexes
CREATE INDEX idx_workouts_user_id ON public.workouts(user_id);
CREATE INDEX idx_workouts_protocol_id ON public.workouts(protocol_id);
CREATE INDEX idx_workout_sessions_user_id ON public.workout_sessions(user_id);
CREATE INDEX idx_workout_sessions_started_at ON public.workout_sessions(started_at);

-- Exercise indexes
CREATE INDEX idx_exercises_muscle_groups ON public.exercises USING GIN(muscle_groups);
CREATE INDEX idx_exercises_user_id ON public.exercises(user_id);

-- Goal indexes
CREATE INDEX idx_goals_user_id ON public.goals(user_id);
CREATE INDEX idx_goals_target_date ON public.goals(target_date);

-- Friendship indexes
CREATE INDEX idx_friendships_requester_id ON public.friendships(requester_id);
CREATE INDEX idx_friendships_addressee_id ON public.friendships(addressee_id);
CREATE INDEX idx_friendships_status ON public.friendships(status);

-- Measurement indexes
CREATE INDEX idx_body_measurements_user_id ON public.body_measurements(user_id);
CREATE INDEX idx_body_measurements_measured_at ON public.body_measurements(measured_at);

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.body_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timer_presets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Workout protocols policies
CREATE POLICY "Users can manage their own workout protocols" ON public.workout_protocols
  FOR ALL USING (auth.uid() = user_id);

-- Workouts policies
CREATE POLICY "Users can manage their own workouts" ON public.workouts
  FOR ALL USING (auth.uid() = user_id);

-- Exercises policies (users can see public exercises and their own)
CREATE POLICY "Users can view public exercises and their own" ON public.exercises
  FOR SELECT USING (user_id IS NULL OR auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can manage their own exercises" ON public.exercises
  FOR ALL USING (auth.uid() = user_id);

-- Workout sessions policies
CREATE POLICY "Users can manage their own workout sessions" ON public.workout_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Goals policies
CREATE POLICY "Users can manage their own goals" ON public.goals
  FOR ALL USING (auth.uid() = user_id);

-- Friendships policies
CREATE POLICY "Users can manage their friendships" ON public.friendships
  FOR ALL USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

-- Body measurements policies
CREATE POLICY "Users can manage their own measurements" ON public.body_measurements
  FOR ALL USING (auth.uid() = user_id);

-- Timer presets policies
CREATE POLICY "Users can manage their own timer presets" ON public.timer_presets
  FOR ALL USING (auth.uid() = user_id);

-- User settings policies
CREATE POLICY "Users can manage their own settings" ON public.user_settings
  FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workout_protocols_updated_at BEFORE UPDATE ON public.workout_protocols
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workouts_updated_at BEFORE UPDATE ON public.workouts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON public.goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_friendships_updated_at BEFORE UPDATE ON public.friendships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username', NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- SAMPLE DATA FOR DEVELOPMENT
-- =============================================

-- Insert sample achievements
INSERT INTO public.achievements (name, description, icon, category, requirement_type, requirement_value) VALUES
('First Workout', 'Complete your first workout', '🎯', 'milestone', 'workout_count', 1),
('Week Warrior', 'Complete 7 workouts in a week', '🔥', 'frequency', 'weekly_workouts', 7),
('Streak Master', 'Maintain a 30-day workout streak', '⚡', 'streak', 'streak_days', 30),
('Heavy Lifter', 'Lift 1000kg total in a session', '💪', 'strength', 'session_weight', 1000),
('Consistency King', 'Work out 100 times', '👑', 'milestone', 'workout_count', 100);

-- Insert sample global exercises
INSERT INTO public.exercises (user_id, name, description, muscle_groups, equipment, difficulty_level, is_public) VALUES
(NULL, 'Push-ups', 'Classic bodyweight chest exercise', ARRAY['chest', 'triceps', 'shoulders'], ARRAY['bodyweight'], 2, true),
(NULL, 'Bench Press', 'Fundamental chest pressing movement', ARRAY['chest', 'triceps', 'shoulders'], ARRAY['barbell', 'bench'], 3, true),
(NULL, 'Squats', 'Compound leg exercise', ARRAY['quadriceps', 'glutes', 'hamstrings'], ARRAY['bodyweight'], 2, true),
(NULL, 'Deadlift', 'Full body pulling exercise', ARRAY['hamstrings', 'glutes', 'back', 'traps'], ARRAY['barbell'], 4, true),
(NULL, 'Pull-ups', 'Upper body pulling exercise', ARRAY['lats', 'biceps', 'rhomboids'], ARRAY['pull-up bar'], 4, true);

-- =============================================
-- END OF SCHEMA
-- =============================================
