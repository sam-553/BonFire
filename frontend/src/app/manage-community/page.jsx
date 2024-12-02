'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { IconCheck, IconLoader3 } from '@tabler/icons-react';

const managecummunitySchema = Yup.object().shape({
  title: Yup.string().required('Write a title here'),
  image: Yup.string().required('Image is required for the post'),
});

const Rightsidebar = () => {
  const router = useRouter();
  const [communityList, setCommunityList] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const managecommunityForm = useFormik({
    initialValues: {
      title: '',
      image: '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log(values);
      axios.post('http://localhost:5000/community/add', values)
        .then((result) => {
          toast.success('Community created');
          fetchCommunity();
          resetForm();
        }).catch((err) => {
          toast.error(err?.response?.data?.message || 'Something went wrong');
          setSubmitting(false);
        });
    },
    validationSchema: managecummunitySchema,
  });

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'preset553');
    formData.append('cloud_name', 'dwol2gffj');

    const res = await axios.post('https://api.cloudinary.com/v1_1/dwol2gffj/image/upload', formData);
    if (res.status === 200) {
      managecommunityForm.setFieldValue('image', res.data.url);
      toast.success('Image uploaded successfully');
    }
  };

  const fetchCommunity = async () => {
    const res = await axios.get('http://localhost:5000/community/getall');
    setCommunityList(res.data);
  };

  useEffect(() => {
    fetchCommunity();
  }, []);

  const deleteCommunity = async (id) => {
    if (!confirm('Are you sure you want to delete this community?')) return;
    const res = await axios.delete(`http://localhost:5000/community/delete/${id}`);
    if (res.status === 200) {
      fetchCommunity();
      toast.success('Community deleted successfully');
    } else {
      toast.error('Failed to delete community');
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  };

  return (
    <div className={`min-h-screen bg-cover bg-center bg-fixed ${darkMode ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'}`} style={{ backgroundImage: 'url(images/combg1.avif)' }}>
      <div className="flex justify-between sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5 px-4 py-12 sm:py-16">
        {/* Left Side Form */}
        <div className="w-full sm:w-[320px] md:w-[350px] lg:w-[400px] bg-gray-900 bg-opacity-90 border mt-5 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 border-gray-800 mt-5">
          <form className="space-y-6 mt-5" onSubmit={managecommunityForm.handleSubmit}>
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block mb-2 text-lg font-medium">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={managecommunityForm.handleChange}
                value={managecommunityForm.values.title}
                className="bg-gray-700 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
                placeholder="Enter community title"
              />
              {managecommunityForm.errors.title && managecommunityForm.touched.title && (
                <p className="text-xs text-red-600 mt-2">{managecommunityForm.errors.title}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="bg-gray-700 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-center">
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                onChange={uploadImage}
                className="hidden"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={managecommunityForm.isSubmitting || !managecommunityForm.values.image}
              className="flex items-center justify-center gap-3 w-full py-3 px-4 mt-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 "
            >
              {managecommunityForm.isSubmitting ? <IconLoader3 className="animate-spin" /> : <IconCheck />}
              {managecommunityForm.isSubmitting ? 'Uploading...' : 'Create Community'}
            </button>
          </form>
        </div>

        {/* Right Side - Your Community List */}
        <div className="w-full sm:w-[320px] md:w-[350px] lg:w-[500px] bg-gray-900 bg-opacity-95 border mt-5 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 border-gray-800 sticky top-24">
          <div className="flex items-center justify-between">
            <h5 className="text-xl font-bold">Your Communities</h5>
            <button onClick={toggleDarkMode} className="text-white">
              Toggle Dark Mode
            </button>
          </div>
          <div className="flow-root mt-5">
            {communityList.length === 0 ? (
              <p className="text-sm text-gray-400">No communities available</p>
            ) : (
              communityList.map((community) => (
                <div key={community._id} className="py-3 sm:py-4">
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li>
                      <div className="flex items-center justify-between">
                        <div className="flex-shrink-0">
                          <img className="h-16" src={community.image} alt="Community Avatar" />
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                          <p className="text-sm font-medium text-white truncate">{community.title}</p>
                        </div>
                        <button
                          className="inline-flex items-center text-base font-semibold text-red-500"
                          onClick={() => deleteCommunity(community._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightsidebar;
