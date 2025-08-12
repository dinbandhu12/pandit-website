import React from 'react'
import Navigation from "../components/Navigation"
import Hero from "../components/Hero"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Star, Phone, MapPin, Clock } from "lucide-react"

const Home = () => {
  const featuredServices = [
    {
      title: "Grihapravesh Puja",
      description: "Sacred house warming ceremony for new beginnings",
      price: "₹3,500 onwards",
      emoji: "🏠"
    },
    {
      title: "Marriage Puja",
      description: "Traditional wedding ceremonies with Vedic rituals",
      price: "₹15,000 onwards",
      emoji: "💒"
    },
    {
      title: "Satyanarayan Puja",
      description: "Powerful prayers for prosperity and peace",
      price: "₹2,500 onwards",
      emoji: "🙏"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* Featured Services */}
      <section className="py-20 bg-gradient-to-br from-golden/5 to-saffron/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-saffron to-sacred-red bg-clip-text text-transparent">
                Popular Puja Services
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience authentic Hindu ceremonies performed by knowledgeable North Indian pandits
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredServices.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-saffron/20 to-sacred-red/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">{service.emoji}</span>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">{service.description}</p>
                  <p className="font-semibold text-saffron">{service.price}</p>
                  <Button className="w-full bg-gradient-to-r from-saffron to-sacred-red hover:opacity-90">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-saffron to-sacred-red bg-clip-text text-transparent">
                  Why Choose Our Services?
                </span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: "🕉", title: "Authentic Rituals", description: "Traditional Vedic ceremonies performed correctly" },
                { icon: "👨‍🏫", title: "Experienced Pandits", description: "Qualified North Indian pandits with deep knowledge" },
                { icon: "🏠", title: "Home Service", description: "Convenient doorstep puja services" },
                { icon: "💯", title: "Complete Satisfaction", description: "100% customer satisfaction guarantee" }
              ].map((feature, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-saffron/20 to-sacred-red/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-saffron to-sacred-red">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Book Your Sacred Ceremony Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Connect with our experienced pandits and ensure your puja is performed with proper rituals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-saffron hover:bg-gray-100">
                <Phone className="h-5 w-5 mr-2" />
                (+91) 9102416476
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-saffron">
                <MapPin className="h-5 w-5 mr-2" />
                View Location
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 