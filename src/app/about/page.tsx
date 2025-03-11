import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-6 bg-primary text-primary">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-6">About Novar</h1>
        <p className="text-lg text-secondary text-justify">
          Hi, I&apos;m Yousef, the founder of Novar. Ever since I was a kid, I&apos;ve been passionate about creating—whether it was drawing, origami, building props, or making short films. 
          What started as a personal hobby evolved into something much bigger. I have always believed that art and technology go hand in hand, and over the years, I have explored the balance between storytelling, craftsmanship, and innovation. 
          What started as creating costumes evolved into finding ways to enhance them with technology and showcase them through film, ultimately leading me to create Novar—a space where creativity has no limits.
        </p>

        <p className="text-lg text-secondary text-center mt-4">
          Novar is more than just a brand; it&apos;s a vision. Novar is a place where dreamers come together to push the boundaries of what is possible. 
          Whether it&apos;s a 3D-printed gadget, a new pair of jeans, or even a robot, Novar is about pushing creative and technological boundaries to make ambitious ideas a reality. 
          At its core, Novar is about innovation, collaboration, and education. It&apos;s a platform for innovation, a hub for learning, and a community where people with ideas can bring them to life. 
          I want Novar to be the space I wished I had growing up—a place that encourages experimentation, embraces failure, and celebrates creation.
        </p>

        <p className="text-lg text-secondary text-center mt-4">
          Join me as we build a future where creativity and technology fuel each other, shaping new possibilities with every project.
        </p>
      </div>

      {/* Team Image */}
      <div className="flex justify-center mt-10">
        <Image 
          src="/novar-team.jpg" 
          alt="Novar Team" 
          width={700} 
          height={400} 
          className="rounded-lg shadow-box"
        />
      </div>

      {/* Core Values Section */}
      <div className="mt-16 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-6">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-secondary">
          <div className="p-6 box">
            <h3 className="text-xl font-bold text-accent">Innovation</h3>
            <p className="mt-2">We push creative and technological boundaries.</p>
          </div>
          <div className="p-6 box">
            <h3 className="text-xl font-bold text-accent">Collaboration</h3>
            <p className="mt-2">Great things happen when minds work together.</p>
          </div>
          <div className="p-6 box">
            <h3 className="text-xl font-bold text-accent">Education</h3>
            <p className="mt-2">Sharing knowledge fuels the next generation of creators.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
