import React from 'react';
import { ArrowRight, Brain } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gray-50 py-16 sm:py-24">
      <div className="absolute inset-y-0 w-full h-full">
        <div className="absolute h-full w-full bg-gradient-to-br from-blue-50 to-white opacity-90" />
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="p-2 bg-blue-600 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
              <Brain className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight mb-8">
            Explore your Future with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              BindaasBhaiya
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            Your AI Career Guide for Classes 9-12. Get personalized career guidance,
            explore opportunities, and plan your future with confidence.
          </p>

          <div className="flex justify-center space-x-4">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg">
              <span>Start Chatting</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors border border-blue-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}