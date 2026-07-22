import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {urlConfig} from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();
    const backendBaseUrl = urlConfig.backendUrl || "http://localhost:3060";

        
    useEffect(() => {
        const fetchGifts = async () => {
        try {
            const response = await fetch(`${backendBaseUrl}/api/gifts`);
            if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            setGifts(data || []);
        } catch (error) {
            console.error("Failed to fetch gifts:", error);
        }
        };

    fetchGifts();
  }, [backendBaseUrl]);

    // Task 2: Navigate to details page
    const goToDetailsPage = (productId) => {
    navigate(`/app/product/${productId}`);
    };
    // Task 3: Format timestamp
    const formatDate = (timestamp) => {
        if (!timestamp) return "Unknown";
        return new Date(timestamp * 1000).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        });
      };

    const getConditionClass = (condition) => {
        return condition === "New" ? "list-group-item-success" : "list-group-item-warning";
    };

    return (
        <div className="container mt-5">
          <h2 className="mb-4">Available Gifts</h2>
          <div className="row">
            {gifts.length > 0 ? (
              gifts.map((gift) => {
                const imageSrc = gift.image
                  ? gift.image.startsWith("http")
                    ? gift.image
                    : gift.image.startsWith("/")
                    ? gift.image
                    : `/${gift.image}`
                  : null;
    
                return (
                  <div key={gift.id} className="col-md-4 mb-4">
                    <div className="card product-card h-100">
                      <div
                        className="card-img-top d-flex align-items-center justify-content-center bg-light"
                        style={{ height: "180px", overflow: "hidden" }}
                      >
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={gift.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div className="text-muted">No Image Available</div>
                        )}
                      </div>
    
                      <div className="card-body">
                        <h5 className="card-title">{gift.name}</h5>
                        <p className="card-text mb-1">
                          <strong>Category:</strong> {gift.category}
                        </p>
                        <p
                          className={`card-text ${getConditionClass(
                            gift.condition,
                          )}`}
                        >
                          {gift.condition}
                        </p>
                        <p className="card-text mb-3">
                          <small className="text-muted">
                            Added {formatDate(gift.date_added)}
                          </small>
                        </p>
    
                        <button
                          onClick={() => goToDetailsPage(gift.id)}
                          className="btn btn-primary"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12">
                <p className="text-muted">No gifts available right now.</p>
              </div>
            )}
          </div>
        </div>
      );
}

export default MainPage;
