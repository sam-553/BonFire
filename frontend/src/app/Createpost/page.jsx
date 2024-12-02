'use client'
import { IconCheck, IconLoader3, IconUpload } from '@tabler/icons-react';
import axios from 'axios';
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Header from '../component/Header';

const createpostSchema = Yup.object().shape({
  caption: Yup.string().required('write some caption here'),
  postedby: Yup.string().required('Add your name'),
  image: Yup.string().required('image is required for post')
})



const Createpost = () => {
  const router = useRouter()
  const [previewUrl, setPreviewUrl] = useState('');

  const createpostForm = useFormik({
    initialValues: {
      caption: '',
      image: '',
      postedby: ''
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log(values);
      axios.post('http://localhost:5000/post/add', values)

        .then((result) => {
          toast.success('post uploaded')
          resetForm()
        }).catch((err) => {
          toast.error(err?.response?.data?.message || 'something went wrong')
          setSubmitting(false)
        });


    },
    validationSchema: createpostSchema
  })

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'preset553');
    formData.append('cloud_name', 'dwol2gffj');

    const res = await axios.post('https://api.cloudinary.com/v1_1/dwol2gffj/image/upload', formData);
    if (res.status === 200) {
      createpostForm.setFieldValue('image', res.data.url);
      setPreviewUrl(res.data.url);
      toast.success('Image uploaded successfully');
    }
  };



  return (
    <>
      <Header></Header>
      <div className="min-h-screen bg-cover  bg-center flex items-center justify-center" style={{ backgroundImage: 'url(images/postbg1.jpeg)' }}>
        <div className="w-full max-w-sm p-4 bg-gray-800 border rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 border-gray-700 mx-auto  ">
          <form className="space-y-6" onSubmit={createpostForm.handleSubmit}>

            {/* Caption Input */}
            <div>
              <label
                htmlFor="caption"
                className="block mb-2 text-sm font-medium text-white"
              >
                Caption
              </label>
              <input
                type="text"
                name="caption"
                id="caption"
                onChange={createpostForm.handleChange}
                value={createpostForm.values.caption}
                className="bg-gray-500 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-white"
                placeholder="Enter a caption"
                required
              />
              {createpostForm.errors.caption && createpostForm.touched.caption && (
                <p className="text-xs text-red-600 mt-2">{createpostForm.errors.caption}</p>
              )}
            </div>

            {/* Posted By Input */}
            <div>
              <label
                htmlFor="postedby"
                className="block mb-2 text-sm font-medium text-white"
              >
                Posted By
              </label>
              <input
                type="text"
                name="postedby"
                id="postedby"
                onChange={createpostForm.handleChange}
                value={createpostForm.values.postedby}
                className="bg-gray-500 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-white"
                placeholder="Enter your name"
                required
              />
              {createpostForm.errors.postedby && createpostForm.touched.postedby && (
                <p className="text-xs text-red-600 mt-2">{createpostForm.errors.postedby}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="bg-green-600 border border-gray-300 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 text-center dark:border-gray-500 dark:placeholder-gray-400 text-white flex items-center justify-center"
              >
                <IconUpload className=''></IconUpload>     Select Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={uploadImage}
                className="hidden"
                required
              />
              {createpostForm.errors.image && createpostForm.touched.image && (
                <p className="text-xs text-red-600 mt-2">{createpostForm.errors.image}</p>
              )}
            </div>


            {
              previewUrl ? (
                <img src={previewUrl} alt="" />
              ) : (
                <h2 className='text-white'>No Image Selected</h2>
              )
            }

            {/* Submit Button */}
            <button
              type="submit"
              disabled={createpostForm.isSubmitting || !createpostForm.values.image}
              className="flex items-center justify-center gap-3 w-full py-3 px-4 mt-3 text-sm font-medium rounded-lg bg-blue-700 text-white hover:bg-blue-800  "
            >
              {createpostForm.isSubmitting ? <IconLoader3 className="animate-spin" /> : <IconCheck />}
              {createpostForm.isSubmitting ? 'Submitting...' : 'Post'}
            </button>
          </form>
        </div>
      </div>


    </>
  )
}

export default Createpost