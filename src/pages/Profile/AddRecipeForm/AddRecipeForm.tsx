import React, { useState, FormEvent } from 'react';
import {slugify} from '../../../utils/slugify';

interface Compound {
    name: string;
    weight: string;
}

interface CookingStep {
    step: number;
    stepDescription: string;
}

interface Story {
    year: string;
    history: string;
}

export const AddRecipeForm: React.FC = () => {
    const countries = [
        "Armenia", "Azerbaijan", "Belarus", "Kazakhstan", "Kyrgyzstan", "Moldova",
        "Russia", "Tajikistan", "Turkmenistan", "Uzbekistan", "Ukraine", "Georgia",
        "Latvia", "Lithuania", "Estonia", "Poland", "Finland", "Sweden", "Norway",
        "Germany", "France", "Italy", "Spain", "Portugal", "Netherlands", "Belgium",
        "Romania", "Bulgaria", "Hungary", "Slovakia", "Czech Republic", "Croatia",
        "Slovenia", "Serbia", "North Macedonia", "Albania", "Kosovo", "Montenegro",
        "Bosnia and Herzegovina", "Austria", "Switzerland", "Denmark", "Ireland"
    ];

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        season: 'all year',
        compound: [{ name: '', weight: '' }] as Compound[],
        cooking: [{ step: 1, stepDescription: '' }] as CookingStep[],
        img: '',
        difficult: '',
        time: '',
        portion: 1,
        country: '',
        kcal: 0,
        veget: false,
        lightness: '',
        meal: '',
        story: [{ year: '', history: '' }] as Story[],
        slugName: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        // Генерация slugName на основе name
        if (name === 'name') {
            const slug = slugify(value);
            setFormData(prev => ({
                ...prev,
                slugName: slug,
            }));
        }
    };

    const handleCompoundChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newCompound = [...formData.compound];
        newCompound[index] = { ...newCompound[index], [name]: value };
        setFormData(prev => ({
            ...prev,
            compound: newCompound,
        }));
    };

    const handleCookingChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newCooking = [...formData.cooking];
        newCooking[index] = { ...newCooking[index], [name]: value };
        setFormData(prev => ({
            ...prev,
            cooking: newCooking,
        }));
    };

    const handleStoryChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newStory = [...formData.story];
        newStory[index] = { ...newStory[index], [name]: value };
        setFormData(prev => ({
            ...prev,
            story: newStory,
        }));
    };

    const addCompound = () => {
        setFormData(prev => ({
            ...prev,
            compound: [...prev.compound, { name: '', weight: '' }]
        }));
    };

    const addCookingStep = () => {
        setFormData(prev => ({
            ...prev,
            cooking: [...prev.cooking, { step: prev.cooking.length + 1, stepDescription: '' }]
        }));
    };

    const addStory = () => {
        setFormData(prev => ({
            ...prev,
            story: [...prev.story, { year: '', history: '' }]
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://217.114.8.68:5000/auth/addRecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add recipe');
            }
            setFormData({
                name: '',
                description: '',
                category: '',
                season: 'all year',
                compound: [{ name: '', weight: '' }],
                cooking: [{ step: 1, stepDescription: '' }],
                img: '',
                difficult: '',
                time: '',
                portion: 1,
                country: '',
                kcal: 0,
                veget: false,
                lightness: '',
                meal: '',
                story: [{ year: '', history: '' }],
                slugName: ''
            });
            setIsModalOpen(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-darkred text-white font-bold py-2 px-4 rounded-md hover:bg-EIO duration-200"
            >
                Add Recipe
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 text-BlackOlive">
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div
                        className="relative bg-white w-full max-w-lg mx-auto p-6 rounded-md shadow-lg z-10 overflow-y-auto max-h-[90vh]">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>

                            {/* Recipe Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="name">Recipe Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Spaghetti Bolognese"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                />
                            </div>

                            {/* Recipe Description */}
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2"
                                       htmlFor="description">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    placeholder="A delicious spaghetti recipe..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                />
                            </div>

                            {/* Recipe Category */}
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="category">Category</label>
                                <select
                                    name="category"
                                    id="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                >
                                    <option value="Appetizers">Appetizers</option>
                                    <option value="Baking and Pastries">Baking and Pastries</option>
                                    <option value="Drinks">Drinks</option>
                                    <option value="Dumplings and Noodles">Dumplings and Noodles</option>
                                    <option value="Grilled and Barbecued Dishes">Grilled and Barbecued Dishes</option>
                                    <option value="International Cuisine">International Cuisine</option>
                                    <option value="Main Dishes">Main Dishes</option>
                                    <option value="Salads">Salads</option>
                                    <option value="Sauces and Condiments">Sauces and Condiments</option>
                                    <option value="Seasons">Seasons</option>
                                    <option value="Side Dishes">Side Dishes</option>
                                    <option value="Soups">Soups</option>
                                    <option value="Vegetarian and Vegan Dishes">Vegetarian and Vegan Dishes</option>
                                </select>
                            </div>

                            {/* Season */}
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="season">Season</label>
                                <select
                                    name="season"
                                    id="season"
                                    value={formData.season}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                >
                                    <option value="winter">Winter</option>
                                    <option value="autumn">Autumn</option>
                                    <option value="summer">Summer</option>
                                    <option value="spring">Spring</option>
                                    <option value="all year">All Year</option>
                                </select>
                            </div>

                            {/* Country */}
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="country">Country</label>
                                <select
                                    name="country"
                                    id="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                >
                                    <option value="">Select a Country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country}>{country}</option>
                                    ))}
                                    <option value="custom">Other (Enter custom country)</option>
                                </select>
                            </div>

                            {/* kcal */}
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="kcal">Calories (kcal)</label>
                                <input
                                    type="number"
                                    name="kcal"
                                    id="kcal"
                                    placeholder="200"
                                    value={formData.kcal}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                />
                            </div>

                            {/* Time */}
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="time">Time (minutes)</label>
                                <input
                                    type="number"
                                    name="time"
                                    id="time"
                                    placeholder="30"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                />
                            </div>

                            {/* Difficulty */}
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="difficult">Difficulty</label>
                                <select
                                    name="difficult"
                                    id="difficult"
                                    value={formData.difficult}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                >
                                    {[...Array(10)].map((_, index) => (
                                        <option key={index} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Compound Ingredients */}
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Ingredients</label>
                                {formData.compound.map((compound, index) => (
                                    <div key={index} className="mb-2">
                                        <input
                                            type="text"
                                            name="name"
                                            value={compound.name}
                                            placeholder="Ingredient"
                                            onChange={(e) => handleCompoundChange(index, e)}
                                            className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                        />
                                        <input
                                            type="text"
                                            name="weight"
                                            value={compound.weight}
                                            placeholder="Weight"
                                            onChange={(e) => handleCompoundChange(index, e)}
                                            className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addCompound}
                                    className="bg-darkred text-white px-4 py-2 rounded-md hover:bg-EIO"
                                >
                                    Add Ingredient
                                </button>
                            </div>

                            {/* Cooking Steps */}
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Cooking Steps</label>
                                {formData.cooking.map((step, index) => (
                                    <div key={index} className="mb-2">
                                        <input
                                            type="number"
                                            name="step"
                                            value={step.step}
                                            placeholder="Step"
                                            onChange={(e) => handleCookingChange(index, e)}
                                            className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                        />
                                        <input
                                            type="text"
                                            name="stepDescription"
                                            value={step.stepDescription}
                                            placeholder={`Step ${step.step}`}
                                            onChange={(e) => handleCookingChange(index, e)}
                                            className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addCookingStep}
                                    className="bg-darkred text-white px-4 py-2 rounded-md hover:bg-EIO"
                                >
                                    Add Step
                                </button>
                            </div>

                            {/* Recipe Image */}
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="img">Image URL</label>
                                <input
                                    type="text"
                                    name="img"
                                    id="img"
                                    placeholder="URL to the image"
                                    value={formData.img}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                />
                            </div>

                            {/* Story */}
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="story">Story (Optional)</label>
                                {formData.story.map((story, index) => (
                                    <div key={index} className="mb-2">
                                        <input
                                            type="text"
                                            name="year"
                                            value={story.year}
                                            placeholder="Year"
                                            onChange={(e) => handleStoryChange(index, e)}
                                            className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                        />
                                        <textarea
                                            name="history"
                                            value={story.history}
                                            placeholder="Story about the recipe"
                                            onChange={(e) => handleStoryChange(index, e)}
                                            className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-BridalHealth"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addStory}
                                    className="bg-darkred text-white px-4 py-2 rounded-md hover:bg-EIO"
                                >
                                    Add Story
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-darkred text-white font-bold py-2 px-4 rounded-md hover:bg-EIO duration-200"
                            >
                                Submit Recipe
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
