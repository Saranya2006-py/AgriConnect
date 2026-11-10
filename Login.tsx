import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wheat, Phone, MapPin, User, Globe, Shield } from 'lucide-react';
import { UserRole } from '@/types';
import { toast } from 'sonner';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    location: '',
    language: 'en',
    role: '' as UserRole | '',
  });
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');

  const handleSendOtp = () => {
    if (!formData.name || !formData.mobile || !formData.location || !formData.role) {
      toast.error('Please fill all required fields');
      return;
    }
    
    if (formData.mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    // Simulate OTP send (in production, this would call an API)
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(generatedOtp);
    setStep('otp');
    toast.success(`OTP sent to ${formData.mobile}. Demo OTP: ${generatedOtp}`);
  };

  const handleVerifyOtp = () => {
    if (otp === sentOtp) {
      login({
        name: formData.name,
        mobile: formData.mobile,
        location: formData.location,
        language: formData.language,
        role: formData.role as UserRole,
      });
      toast.success('Login successful!');
      navigate(formData.role === 'farmer' ? '/farmer' : '/buyer');
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative animate-scale-in shadow-elevated">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Wheat className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-heading">CropConnect</CardTitle>
          <CardDescription>
            {step === 'details' 
              ? 'Create your account to start trading crops' 
              : 'Enter the OTP sent to your mobile'
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 'details' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" /> Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Mobile Number
                </Label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-muted rounded-md text-sm text-muted-foreground">
                    +91
                  </div>
                  <Input
                    id="mobile"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Location
                </Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Preferred Language
                </Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData({ ...formData, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>I am a</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'farmer' })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.role === 'farmer'
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">👨‍🌾</div>
                    <div className="font-medium">Farmer</div>
                    <div className="text-xs text-muted-foreground">Sell your crops</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'buyer' })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.role === 'buyer'
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">🏪</div>
                    <div className="font-medium">Buyer</div>
                    <div className="text-xs text-muted-foreground">Purchase crops</div>
                  </button>
                </div>
              </div>

              <Button onClick={handleSendOtp} className="w-full" size="lg">
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit OTP sent to <br />
                  <span className="font-medium text-foreground">+91 {formData.mobile}</span>
                </p>
              </div>

              <div className="space-y-2">
                <Input
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-2xl tracking-[0.5em] font-mono"
                  maxLength={6}
                />
              </div>

              <Button onClick={handleVerifyOtp} className="w-full" size="lg">
                Verify & Login
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  ← Back to details
                </button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
