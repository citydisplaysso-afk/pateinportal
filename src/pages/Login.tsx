import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  User,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Smartphone,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { hospitalInfo } from '@/data/mockData';

export default function Login() {
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

      <div className="relative flex min-h-screen">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden w-1/2 flex-col justify-between p-12 lg:flex"
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Activity className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{hospitalInfo.name}</h1>
                <p className="text-sm text-white/70">{hospitalInfo.nameLocal}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold leading-tight text-white">
                Your Health,
                <br />
                Your Portal
              </h2>
              <p className="mt-4 max-w-md text-lg text-white/80">
                Caafimaadkaaga iyo diiwaankaaga caafimaad waxay ku jiraan gacmahaaga.
              </p>
              <p className="mt-2 text-white/60">
                Your health and medical records are in your hands.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, label: 'Secure', labelLocal: 'Ammaan' },
                { icon: Smartphone, label: 'Mobile', labelLocal: 'Moobil' },
                { icon: Globe, label: '24/7 Access', labelLocal: 'Maalin iyo Habeen' },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="rounded-xl bg-white/10 p-4 backdrop-blur-sm"
                >
                  <feature.icon className="mb-2 h-6 w-6 text-white" />
                  <p className="font-medium text-white">{feature.label}</p>
                  <p className="text-xs text-white/60">{feature.labelLocal}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-white/50">
            <p>© 2025 {hospitalInfo.name}</p>
            <p>{hospitalInfo.address}</p>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12"
        >
          <div className="w-full max-w-md">
            <div className="overflow-hidden rounded-2xl bg-card shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-glow lg:hidden">
                  <Activity className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
                <p className="text-muted-foreground">Ku soo dhawoow</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sign in with your e-Aqoonsi National ID
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5 p-6">
                <div className="space-y-2">
                  <Label htmlFor="nationalId" className="text-foreground">
                    National ID / Lambarka Aqoonsiga
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="nationalId"
                      type="text"
                      placeholder="123-456-789"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      className="h-12 pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Password / Furaha sirta
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign In / Gal'
                  )}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">or</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => navigate('/dashboard')}
                >
                  <Shield className="h-5 w-5" />
                  Sign in with e-Aqoonsi App
                </Button>
              </form>

              {/* Footer */}
              <div className="border-t border-border bg-muted/30 p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <a href="#" className="font-medium text-primary hover:underline">
                    Register at the hospital
                  </a>
                </p>
              </div>
            </div>

            {/* Help Text */}
            <p className="mt-6 text-center text-sm text-white/70">
              Need help? Call{' '}
              <a href={`tel:${hospitalInfo.phone}`} className="font-medium underline">
                {hospitalInfo.phone}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
