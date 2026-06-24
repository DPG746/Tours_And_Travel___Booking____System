import { Globe, Users, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient">About TravelWise</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're passionate about creating unforgettable travel experiences that inspire, connect, and transform lives.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 mb-16 animate-fade-in-up shadow-glow">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            To make world-class travel accessible to everyone by providing exceptional service, unbeatable prices, and carefully curated experiences that create lasting memories. We believe that travel has the power to broaden perspectives, foster understanding, and bring people together.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Users, number: "500K+", label: "Happy Travelers" },
            { icon: Globe, number: "150+", label: "Destinations" },
            { icon: Award, number: "50+", label: "Awards Won" },
            { icon: Heart, number: "98%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-white hover:shadow-glow transition-all animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex p-4 gradient-primary rounded-full mb-4 shadow-glow">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="space-y-8 mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2015, TravelWise started with a simple idea: travel should be easy, affordable, and extraordinary. Our founders, avid travelers themselves, noticed that booking trips was often complicated, expensive, and stressful. They envisioned a platform that would change that.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we've grown into a trusted travel partner for over 500,000 travelers worldwide. Our team of travel experts works tirelessly to negotiate the best deals, curate unique experiences, and provide 24/7 support to ensure your journey is seamless from start to finish.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe in sustainable tourism and work closely with local communities to ensure that travel benefits everyone. When you book with TravelWise, you're not just planning a trip—you're becoming part of a global community that values authentic experiences, cultural exchange, and responsible travel.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
          {[
            {
              title: "Customer First",
              description: "Your satisfaction is our top priority. We go above and beyond to ensure every trip exceeds expectations.",
            },
            {
              title: "Trust & Transparency",
              description: "No hidden fees, no surprises. We believe in honest pricing and clear communication.",
            },
            {
              title: "Sustainable Travel",
              description: "We're committed to protecting the places we love and supporting local communities.",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-muted/30 hover:bg-white hover:shadow-glow transition-all"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-primary">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
