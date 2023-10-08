import { useState } from 'react';

export default function CreateListing() {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { value: '1', label: 'Paintings' },
    { value: '2', label: 'Sculptures' },
    { value: '3', label: 'Ceramics and Pottery' },
    { value: '4', label: 'Jewelry' },
    { value: '5', label: 'Textiles and Fabrics' },
    { value: '6', label: 'Paper craft' },
    { value: '7', label: 'Wood craft' },
    { value: '8', label: 'Glass craft' },
    { value: '9', label: 'Leather craft<' },
    { value: '10', label: 'Metal craft' },
    { value: '11', label: 'Traditional craft' },
    { value: '12', label: 'Prints and Posters'},
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-4">Add a New Product</h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="border rounded-lg  p-4">
            <h2 className="text-xl font-semibold">Product Details</h2>
            <label htmlFor="name" className="block mt-3  text-slate-950">
            Product Name:
          </label>
          <input
            type="text"
            className="border p-2 rounded-lg w-full"
            id="name"
            maxLength="60"
            minLength="10"
            required
          />

          <label htmlFor="description" className="block text-slate-950 mt-4">
            Product Description:
          </label>
          <textarea
            type="text"
            className="border p-2 rounded-lg w-full"
            id="description"
            required
          />

          <label htmlFor="materials" className="block text-slate-950 mt-4">
            Materials Used:
          </label>
          <input
            type="text"
            className="border p-2 rounded-lg w-full"
            id="materials"
            required
          />

          <label htmlFor="dropdown" className="block text-slate-950 mt-4">
            Select a Category:
          </label>
          <select
            id="category"
            name="dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
            className="border p-2 rounded-lg w-full"
          >
            <option value="">Select a Category</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label htmlFor="price" className="block text-slate-950 mt-4">
            Product Price:
          </label>
          <input
            type="number"
            className="border p-2 rounded-lg w-full"
            id="price"
            required
          />

          <label htmlFor="stock" className="block text-slate-950 mt-4">
            Stock Number:
          </label>
          <input
            type="number"
            className="border p-2 rounded-lg w-full"
            id="stock"
            required
          />
            <button
              onClick={nextStep}
              className="p-3 mt-3 bg-teal-700 text-white rounded-lg uppercase"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">Images (max 6)</h2>
            <div>
            <input
            className="border p-2 mt-3 rounded-lg w-full"
            type="file"
            id="images"
            accept="image/*"
            multiple
          />
          <button className='p-3 text-black underline rounded-lg font-bold'>Upload</button>
          </div>
            <button
              onClick={prevStep}
              className="p-3 mt-3 bg-gray-300 text-gray-700 rounded-lg uppercase mr-2"
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              className="p-3 mt-3 bg-teal-700 text-white rounded-lg uppercase"
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="border rounded-lg p-4">
            <h2 className="text-xl mt-3 font-semibold">Product Dimensions</h2>
            <div className="flex flex-col space-y-2 mt-4">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                id="height"
                min="1"
                max="10"
                required
                className="border p-2 rounded-lg w-1/2"
              />
              <p>Height (inches)</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                id="width"
                min="1"
                max="10"
                required
                className="border p-2 rounded-lg w-1/2"
              />
              <p>Width (inches)</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                id="depth"
                min="1"
                max="10"
                required
                className="border p-2 rounded-lg w-1/2"
              />
              <p>Depth (inches)</p>
            </div>
          </div>
            <button
              onClick={prevStep}
              className="p-3 bg-gray-300 text-gray-700 rounded-lg uppercase mr-2"
            >
              Previous
            </button>
            <button
              type="submit"
              className="p-3 mt-3 bg-teal-700 text-white rounded-lg uppercase"
            >
              Add Product
            </button>
          </div>
        )}
      </form>
    </main>
  );
}
