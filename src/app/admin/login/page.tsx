'use client';

import { useState, useTransition } from 'react';
import { loginAction } from './actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await loginAction(null, formData);
      if (result && result.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f6f1] px-4 font-sans">
      <div className="w-full max-w-md">
        {/* Branding header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-[#c4744a] shadow-md shadow-[#c4744a]/20">
            <span className="text-xl font-semibold text-white tracking-wide">YA</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1c1812] font-serif">
            Dr. Yassmin Allam
          </h2>
          <p className="mt-2 text-sm text-[#7a6e5f] font-medium tracking-wide uppercase">
            Admin Portal Access
          </p>
        </div>

        <Card className="border-[#ede8df] bg-[#fdfaf6] shadow-xl shadow-[#1c1812]/5 backdrop-blur-sm">
          <CardHeader className="space-y-2 border-b border-[#ede8df]/60 pb-5">
            <CardTitle className="text-2xl font-bold text-[#1c1812] font-serif">Sign In</CardTitle>
            <CardDescription className="text-[#7a6e5f]">
              Enter your admin credentials to manage the platform.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5 pt-6">
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50/50 p-3.5 text-sm text-red-750 font-medium">
                  {error}
                </div>
              )}
              
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-[#1c1812] font-semibold text-xs uppercase tracking-wider">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a6e5f]" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@dryasmen.com"
                    className="pl-10 border-[#ede8df] bg-[#ede8df]/20 text-[#1c1812] focus-visible:ring-[#c4744a] focus-visible:border-[#c4744a] placeholder:text-[#7a6e5f]/50"
                    required
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="password" className="text-[#1c1812] font-semibold text-xs uppercase tracking-wider">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a6e5f]" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10 border-[#ede8df] bg-[#ede8df]/20 text-[#1c1812] focus-visible:ring-[#c4744a] focus-visible:border-[#c4744a]"
                    required
                    disabled={isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a6e5f] hover:text-[#1c1812]"
                    disabled={isPending}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-[#1c1812] hover:bg-[#c4744a] text-[#f9f6f1] font-semibold tracking-wide shadow-lg shadow-[#1c1812]/10 transition-all duration-300 rounded-md py-6" 
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#f9f6f1]" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
