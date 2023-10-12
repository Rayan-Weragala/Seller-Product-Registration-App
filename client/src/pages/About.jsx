import image from './LOGO.jpg'
export default function About() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">About Articrafts</h1>
      <p className="mb-4 text-slate-700 text-lg">At ArtiCraft, we're more than just 
        an online marketplace; 
        we're a vibrant community that celebrates the 
        creativity and craftsmanship of local artisans. 
        Our mission is to empower talented individuals from all walks 
        of life to showcase their unique skills and traditions on a global stage. 
        We believe in the beauty of handcrafted artistry, 
        and we're committed to preserving cultural heritage while fostering economic independence.
        </p>
        <p className="mb-4 text-slate-700 text-lg">
        Our platform brings you an exquisite collection of one-of-a-kind treasures, 
        each with a story to tell. From intricate textiles and breathtaking ceramics to intricate jewelry and timeless woodworking, 
        ArtiCraft is a place where art meets heart. We are dedicated to connecting art lovers and artisans, 
        offering you a curated selection of quality products that support the livelihoods of our talented creators.
        </p>
        <p className="mb-4 text-slate-700 text-lg">
        oin us on a journey to discover, support, and embrace the incredible world of artisanal craftsmanship. 
        ArtiCraft is where art, culture, and community converge, and we invite you to be a part of this extraordinary experience.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <div className='rounded-full h-100 w-100 mt-2'>
          <img src={image} />
          </div>
        </div>
    </div>
  )
}
