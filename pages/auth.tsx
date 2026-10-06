import { useCallback, useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { AuthInput } from '../components';
import { SvgGithub, SvgGoogle } from '../components/Svgs';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Auth() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<'Register' | 'Sign In'>('Register');

  const toggleStatus = () => {
    setStatus(status === 'Register' ? 'Sign In' : 'Register');
  };

  const login = useCallback(async () => {
    try {
      setLoading(true);
      toast.loading('Signing in...');
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.dismiss();
        toast.error(res.error || 'Invalid credentials');
      } else {
        toast.dismiss();
        toast.success('Successfully logged in!');
        router.push('/');
      }
    } catch (e) {
      console.error(e);
      toast.dismiss();
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      setLoading(true);
      toast.loading('Creating account...');
      await axios.post('/api/register', {
        email,
        name,
        password,
      });
      toast.dismiss();
      toast.success('Account created!');
      await login();
    } catch (error: any) {
      toast.dismiss();
      toast.error(error?.response?.data?.error || 'Email taken or invalid information');
    } finally {
      setLoading(false);
    }
  }, [email, name, password, login]);

  const loginWithProvider = async (provider: string) => {
    toast.loading(`Connecting to ${provider}...`);
    await signIn(provider, { callbackUrl: '/' });
  };

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-rose-600" />

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            ARC<span className="text-red-600">Fiction</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            {status === 'Sign In' ? 'Welcome back! Sign in to your account.' : 'Create an account to save your favorite media.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-zinc-800/80 p-1 rounded-xl mb-6 border border-zinc-700/50">
          <button
            type="button"
            onClick={() => setStatus('Sign In')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              status === 'Sign In'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setStatus('Register')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              status === 'Register'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (status === 'Register') register();
            else login();
          }}
          className="flex flex-col gap-4"
        >
          {status === 'Register' && (
            <AuthInput
              id="name"
              type="text"
              label="Username"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          )}

          <AuthInput
            id="email"
            type="email"
            label="Email address"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />

          <AuthInput
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-red-600/30 text-sm flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : status === 'Register' ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <span className="relative bg-zinc-900 px-3 text-xs text-zinc-500 font-medium uppercase tracking-wider">
            Or continue with
          </span>
        </div>

        {/* Social Providers */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => loginWithProvider('github')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-xl text-white text-xs font-semibold transition"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <SvgGithub />
            </div>
            <span>GitHub</span>
          </button>

          <button
            type="button"
            onClick={() => loginWithProvider('google')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-xl text-white text-xs font-semibold transition"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <SvgGoogle />
            </div>
            <span>Google</span>
          </button>
        </div>

        {/* Guest Explore Hint */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80 text-center">
          <p className="text-xs text-zinc-400">
            Want to browse first?{' '}
            <Link href="/movies" className="text-red-500 font-semibold hover:underline">
              Explore Movies
            </Link>{' '}
            or{' '}
            <Link href="/tvshows" className="text-red-500 font-semibold hover:underline">
              TV Shows
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
