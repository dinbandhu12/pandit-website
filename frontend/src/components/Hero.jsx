import React from 'react'
import { Button } from './ui/button'
import { Phone, MessageCircle } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-saffron/10 via-golden/5 to-sacred-red/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(245,158,11,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-saffron via-golden to-sacred-red bg-clip-text text-transparent">
              Book North Indian Pandit
            </span>
            <br />
            <span className="text-gray-800">
              in Bangalore
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience authentic Vedic ceremonies performed by experienced and qualified pandits. 
            Book online for all types of religious ceremonies and rituals with complete satisfaction guarantee.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-saffron to-sacred-red hover:opacity-90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Phone className="h-5 w-5 mr-2" />
              Book a Pandit Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-saffron text-saffron hover:bg-saffron hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Us
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-saffron/20 to-sacred-red/20 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🕉️</span>
              </div>
              <p className="text-sm text-gray-600">Authentic Vedic Rituals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-saffron/20 to-sacred-red/20 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <p className="text-sm text-gray-600">Experienced Pandits</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-saffron/20 to-sacred-red/20 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🏠</span>
              </div>
              <p className="text-sm text-gray-600">Home Service</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-saffron/20 to-sacred-red/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-golden/20 to-saffron/20 rounded-full blur-xl"></div>
    </section>
  )
}

export default Hero
