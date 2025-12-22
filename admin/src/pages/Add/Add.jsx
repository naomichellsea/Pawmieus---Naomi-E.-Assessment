import React, { useState } from 'react';
import './Add.css';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Dogfood",
        breeds: [] // ✅ New state for storing multiple selected breeds
    });

    // ✅ List of breeds that YOLO can detect
    const availableBreeds = ["Husky", "Beagle", "Bulldog", "Corgi", "Golden Retriever", "Pomeranian"];

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('Image not selected');
            return null;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        formData.append("breeds", JSON.stringify(data.breeds)); // ✅ Convert breeds array to JSON string

        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            toast.success(response.data.message);
            setData({
                name: "",
                description: "",
                price: "",
                category: data.category,
                breeds: [] // ✅ Reset breeds after submission
            });
            setImage(false);
        } else {
            toast.error(response.data.message);
        }
    };

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    // ✅ Handle Multiple Breed Selection
    const handleBreedSelection = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setData(data => ({ ...data, breeds: selectedOptions }));
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept="image/*" id="image" hidden />
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={onChangeHandler}>
                            <option value="Dogfood">Dog Food</option>
                            <option value="catfood">Cat Food</option>
                            <option value="Dogtoys">Dog Toys</option>
                            <option value="cattoys">Cat Toys</option>
                        </select>
                    </div>
                    <div className='add-breed flex-col'> {/* ✅ Multi-select dropdown */}
                        <p>Recommended for Breeds</p>
                        <select multiple name='breeds' onChange={handleBreedSelection}>
                            {availableBreeds.map((breed, index) => (
                                <option key={index} value={breed}>{breed}</option>
                            ))}
                        </select>
                        <small>Hold CTRL (or CMD on Mac) to select multiple breeds</small>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default Add;
