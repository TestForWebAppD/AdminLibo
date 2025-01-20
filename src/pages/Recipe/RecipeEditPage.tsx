import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import RecipeCrumbs from "./RecipeCrumbs";

interface RecipeFormData {
    slugName: string;
    name: string;
    description: string;
    category: string;
    season: string;
    difficult: string;
    time: string;
    portion: number;
    country: string;
    kcal: number;
    veget: boolean;
    lightness: number;
    meal: string;
    story: string;
}

interface Recipe extends RecipeFormData {
    img: string;
    compound: Array<{ name: string; weight: string }>;
    cooking: Array<{ step: number; stepDescription: string }>;
}

const RecipeEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { recipe } = useParams<{ recipe: string }>();
    const [formData, setFormData] = useState<RecipeFormData | null>(null);
    const [initialData, setInitialData] = useState<RecipeFormData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const categories = [
        "Appetizers", "Baking and Pastries", "Drinks", "Dumplings and Noodles",
        "Grilled and Barbecued Dishes", "International Cuisine", "Main Dishes",
        "Salads", "Sauces and Condiments", "Seasons", "Side Dishes", "Soups",
        "Vegetarian and Vegan Dishes",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData((prev) => {
            if (!prev) return null;

            if (type === "checkbox" && e.target instanceof HTMLInputElement) {
                return { ...prev, [name]: e.target.checked };
            }

            return { ...prev, [name]: value };
        });
    };

    const getUpdatedFields = (): Partial<RecipeFormData> => {
        if (!formData || !initialData) return {};
        const updatedFields: Partial<RecipeFormData> = {};

        // Отслеживаем изменения и создаем объект обновлений
        Object.keys(formData).forEach((key) => {
            const field = key as keyof RecipeFormData;
            if (formData[field] !== initialData[field]) {
                // @ts-ignore
                updatedFields[field] = formData[field];
            }
        });

        return updatedFields;
    };

    const handleSubmit = async () => {
        if (!formData) {
            alert("Form data is not available");
            return;
        }

        const updatedFields = getUpdatedFields();
        if (Object.keys(updatedFields).length === 0) {
            alert("No changes made.");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found, please log in.");
            return;
        }

        try {
            for (const [fieldName, value] of Object.entries(updatedFields)) {
                const response = await fetch("http://217.114.8.68:5000/auth/admin/recipe/update-field", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        recipeId: formData.slugName,
                        fieldName: fieldName,
                        value: value,
                    }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to update recipe fields');
                }

                const result = await response.json();
                console.log(result);
            }

        } catch (err) {
            console.error("Error:", err);
            alert(`Error: ${err}`);
        }
    };


    const deleteRecipe = async () => {
        if (!formData) return;

        const token = localStorage.getItem('token');

        if (token) {
            const response = await fetch("http://217.114.10.30:5000/auth/admin/deleteRecipe", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  // Убедитесь, что токен отправляется
                },
                body: JSON.stringify({ slugName: formData.slugName }),
            });

            if (!response.ok) {
                console.error("Error deleting recipe:", await response.json());
                throw new Error("Failed to delete recipe");
            }
            navigate("/recipes");
        } else {
            console.error("No token found");
        }
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://217.114.10.30:5000/recipes/Recipe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ slugName: recipe }),
                });

                if (!response.ok) throw new Error("Failed to fetch recipe.");

                const recipeData: Recipe = await response.json();
                const { img, compound, cooking, ...formData } = recipeData;

                setFormData(formData);
                setInitialData(formData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [recipe]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!formData || !initialData) return <div>No data found.</div>;

    return (
        <React.Fragment>
            <RecipeCrumbs recipeName={initialData.name} />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Edit Recipe</h1>
                <div className="grid grid-cols-1 gap-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500">Original: {initialData.name}</p>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-bold mb-2" htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500">Original: {initialData.category}</p>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold mb-2" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500">Original: {initialData.description}</p>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={deleteRecipe}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Delete Recipe
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RecipeEditPage;
