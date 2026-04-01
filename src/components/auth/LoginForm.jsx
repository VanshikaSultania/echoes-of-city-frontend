import React from 'react';

const LoginForm = () => {
  return (
    <div className="flex flex-col justify-center h-full w-full max-w-md mx-auto px-8 lg:px-12 bg-stone-50 text-stone-900 font-sans">
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-serif italic font-bold tracking-tight mb-4 text-stone-900">
          Echoes of the City<br />Bangalore
        </h1>
        <p className="text-stone-600 font-medium tracking-wide">
          Welcome Back to Heritage Explorer
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-xs font-semibold tracking-widest text-stone-500 uppercase mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="explorer123"
            className="w-full px-4 py-3 bg-transparent border border-stone-300 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-colors placeholder:text-stone-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold tracking-widest text-stone-500 uppercase mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            className="w-full px-4 py-3 bg-transparent border border-stone-300 focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-colors placeholder:text-stone-200"
          />
        </div>

        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-stone-300 text-red-900 focus:ring-red-900 bg-transparent"
          />
          <label htmlFor="remember-me" className="ml-3 block text-sm text-stone-700 font-medium">
            Remember Me
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-4 px-4 bg-[#4a1011] text-white font-medium tracking-widest text-sm uppercase hover:bg-[#380c0d] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a1011]"
        >
          Access the Archive
        </button>
      </form>

      <div className="mt-10 text-center text-sm text-stone-600 font-medium">
        Don't have an account?{' '}
        <a href="#" className="font-bold text-[#8a684b] hover:text-[#6b5039]">
          Sign Up
        </a>
      </div>

      <div className="mt-auto pt-16 pb-8 text-center text-[10px] uppercase tracking-widest text-stone-400">
        &copy; 2024 Heritage Explorer Bangalore
      </div>
    </div>
  );
};

export default LoginForm;
