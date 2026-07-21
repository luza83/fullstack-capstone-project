import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {urlConfig} from '../../config';

function SearchPage() {

    //Task 1: Define state variables for the search query, age range, and search results.
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCondition, setSelectedCondition] = useState("");
    const [ageRange, setAgeRange] = useState(10);
    const [searchResults, setSearchResults] = useState([]);
    const categories = ["Living", "Bedroom", "Bathroom", "Kitchen", "Office"];
    const conditions = ["New", "Like New", "Older"];
    const backendBaseUrl = urlConfig.backendUrl || "http://localhost:3060";

    useEffect(() => {
        // fetch all products
        const fetchProducts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`
                console.log(url)
                const response = await fetch(url);
                if (!response.ok) {
                    //something went wrong
                    throw new Error(`HTTP error; ${response.status}`)
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);


    // Task 2. Fetch search results from the API based on user inputs.
    const performSearch = async () => {
        try {
          const params = new URLSearchParams();
          if (searchQuery.trim()) {
            params.append("name", searchQuery.trim());
          }
          if (selectedCategory) {
            params.append("category", selectedCategory);
          }
          if (selectedCondition) {
            params.append("condition", selectedCondition);
          }
          if (ageRange) {
            params.append("age_years", ageRange);
          }
    
          const response = await fetch(
            `${backendBaseUrl}/api/search?${params.toString()}`,
          );
          if (!response.ok) {
            throw new Error(`HTTP error; ${response.status}`);
          }
          const data = await response.json();
          setSearchResults(data || []);
        } catch (error) {
          console.log("Search error: " + error.message);
        }
      };
    const navigate = useNavigate();

    const goToDetailsPage = (productId) => {
        navigate(`/gift/${productId}`);
    };

    return (
        <div className="search-page container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="filter-section mb-3 p-3 border rounded">
                <h5>Filters</h5>
                <div className="d-flex flex-column">
                  <label className="mb-2">Category</label>
                  <select
                    className="form-select mb-3 dropdown-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
    
                  <label className="mb-2">Condition</label>
                  <select
                    className="form-select mb-3 dropdown-filter"
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                  >
                    <option value="">Any Condition</option>
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
    
                  <label className="mb-2">Max Age: {ageRange} years</label>
                  <input
                    type="range"
                    className="form-range age-range-slider"
                    min="1"
                    max="10"
                    step="1"
                    value={ageRange}
                    onChange={(e) => setAgeRange(Number(e.target.value))}
                  />
                </div>
              </div>
    
              <div className="mb-3">
                <label className="form-label">Search by gift name</label>
                <input
                  type="text"
                  className="form-control search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter a gift name"
                />
              </div>
    
              <button className="btn search-button" onClick={performSearch}>
                Search
              </button>
    
              <div className="mt-4">
                {searchResults.length > 0 ? (
                  <div className="list-group">
                    {searchResults.map((gift) => (
                      <button
                        key={gift.id}
                        type="button"
                        className="list-group-item list-group-item-action search-results-card"
                        onClick={() => goToDetailsPage(gift.id)}
                      >
                        <strong>{gift.name}</strong> - {gift.category} (
                        {gift.condition})
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-info search-empty-state">
                    No gifts matched your search.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
}

export default SearchPage;
