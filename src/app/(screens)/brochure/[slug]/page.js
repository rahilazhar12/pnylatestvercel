'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BrochureDownload = ({ params }) => {
  const router = useRouter();
  const { slug } = params;
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '', id_address: '', course_id: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setFormData((prevData) => ({ ...prevData, id_address: data.ip })))
      .catch((error) => console.error("Error fetching IP address:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Submitting form data:", formData);

      // Use FormData to send the data
      const form = new FormData();
      form.append('name', formData.name);
      form.append('phone', formData.phone);
      form.append('email', formData.email);
      form.append('city', formData.city);
      form.append('id_address', formData.id_address);
      form.append('course_id', formData.course_id);

      const response = await fetch('https://www.admin777.pny-trainings.com/api/brochure', {
        method: 'POST',
        body: form, // Send FormData object instead of JSON
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response data:", responseData);
        setIsSubmitted(true);
        setLoading(false);
        router.push(responseData.brochure_link); // Use the actual URL from the response
      } else {
        console.error('Failed to submit form:', response.status, response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false);
    }
  };

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.admin777.pny-trainings.com/api/course/${slug}`
      );
      if (response.ok) {
        const data = await response.json();
        setCourseData(data.course);
        setFormData((prevData) => ({ ...prevData, course_id: data.course.id })); // Set course_id in formData
      } else {
        console.error(`Failed to fetch course data for slug: ${slug}`);
      }
    } catch (error) {
      console.error(
        `Error fetching course data for slug: ${slug}:`,
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchCourseData();
    }
  }, [slug]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Download Brochure</h1>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <div className="loadersmall"></div>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        ) : (
          <p className="text-green-500">Thank you! Your brochure will be downloaded shortly.</p>
        )}
      </div>
    </div>
  );
};

export default BrochureDownload;
