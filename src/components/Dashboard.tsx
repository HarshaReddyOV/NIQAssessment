import React, { createContext, useEffect, useState } from "react";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Highcharts from "highcharts";
import Table from "./Table";
import HighchartsReact from "highcharts-react-official";

export type ProductDetails = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
};

const cancelButton = {
  background: "dodgerblue",
  borderRadius: "inherit",
  marginLeft: "10px",
};

const pageStyle = {
  display: "flex",
  margin: "30px",
};

const DropdownSection = {
  width: "30%",
  display: "flex",
  flexDirection: "column" as "column",
};

const MainSection = {
  width: "70%",
  padding: "5px",
};

export const ProductContext = createContext<ProductDetails[]>([]);

const Dashboard = () => {
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState("");
  const [completeProductDetails, setCompleteProductDetals] =
    useState<ProductDetails>();
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [productOptions, setProductOptions] = useState<ProductDetails[]>([]);
  const [barGraphYAxisCriteria, setbarGraphYAxisCriteria] = useState("price");
  const [options, setOptions] = useState<any>();

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
    setCompleteProductDetals(undefined);
    setProducts("");
  };

  const handleProductsChange = (event: SelectChangeEvent<string>) => {
    setProducts(event.target.value);
    setCompleteProductDetals(
      productOptions.find((product) => product.title === event.target.value)
    );
  };

  const handleGraphAxisChange = (event: SelectChangeEvent<string>) => {
    setbarGraphYAxisCriteria(event.target.value);
  };

  const handleCategoryCancel = () => {
    setCategory("");
  };

  const handleProductCancel = () => {
    setProducts("");
    setCompleteProductDetals(undefined);
    initOrUpdateHighChart(productOptions);
  };

  const fetchCategoryOptions = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategoryOptions(data); // Update the category options state
    } catch (error) {
      console.error("Error fetching category options:", error);
    }
  };

  const fetchProductOptions = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const data = await response.json();
      setProductOptions(data); // Update the product options state
      initOrUpdateHighChart(data);
    } catch (error) {
      console.error("Error fetching product options:", error);
    }
  };

  useEffect(() => {
    fetchCategoryOptions();
  }, []);

  useEffect(() => {
    if (category) {
      fetchProductOptions();
    }
  }, [category, barGraphYAxisCriteria]);

  const initOrUpdateHighChart = (productOptions: ProductDetails[]) => {
    let productTitleList: string[] = [];
    let productYAxisData: number[] = [];
    productOptions.forEach((product) => {
      productTitleList.push(product.title);
      if (barGraphYAxisCriteria === "price") {
        productYAxisData.push(product.price);
      } else {
        productYAxisData.push(product.rating.rate);
      }
    });
    // Create the chart
    // @ts-ignore
    setOptions({
      chart: {
        type: "column",
      },
      title: {
        text:
          barGraphYAxisCriteria === "price"
            ? "Price Comparision"
            : "Rating Comparision",
      },
      xAxis: {
        categories: productTitleList,
      },
      yAxis: {
        title: {
          text: barGraphYAxisCriteria === "price" ? "Price" : "Ratings",
        },
      },
      series: [
        {
          name: "Series 1",
          data: productYAxisData,
        },
      ],
    });
  };

  return (
    <div style={pageStyle}>
      <div style={DropdownSection}>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label1">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label1"
              id="demo-simple-select1"
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton style={cancelButton} onClick={handleCategoryCancel}>
            <CloseIcon />
          </IconButton>
        </div>

        <div style={{ display: "flex", marginTop: "10px" }}>
          <FormControl fullWidth>
            <InputLabel id="select-product">Products</InputLabel>
            <Select
              labelId="select-product"
              id="demo-simple-select1"
              value={products}
              label="Products"
              disabled={!category}
              onChange={handleProductsChange}
            >
              {productOptions.map((option: ProductDetails) => (
                <MenuItem key={option.id} value={option.title}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton style={cancelButton} onClick={handleProductCancel}>
            <CloseIcon />
          </IconButton>
        </div>

        {(!completeProductDetails && category) && (
          <div style={{ display: "flex", marginTop: "10px" }}>
            <FormControl fullWidth>
              <InputLabel id="select-critera">Y axis criteria</InputLabel>
              <Select
                labelId="select-critera"
                id="select-critera"
                value={barGraphYAxisCriteria}
                label="Y axis criteria"
                onChange={handleGraphAxisChange}
              >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
      </div>
      <div style={MainSection}>
        {!!completeProductDetails ? (
          <div style={{ marginLeft: "20px" }}>
            <h2 style={{ textAlign: "start" }}>
              {completeProductDetails.title}
            </h2>
            <div style={{ display: "flex", width: "100%" }}>
              <div>
                <div>
                  <p>{category.toUpperCase()}</p>
                  <p>SKU: {completeProductDetails.rating.count}</p>
                </div>
                <h3>${completeProductDetails.price}</h3>
              </div>
              <div style={{ flex: 1, alignItems: "start" }}>
                <img
                  height={"70px"}
                  width={"70px"}
                  src={completeProductDetails.image}
                  alt="Product Image"
                />
              </div>
            </div>
            <p>{completeProductDetails.description}</p>
          </div>
        ) : category ? (
          <>
            <ProductContext.Provider value={productOptions}>
              <HighchartsReact highcharts={Highcharts} options={options} />
              <Table/>
            </ProductContext.Provider>
          </>
        ) : (
          <h2>Please Select a category</h2>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
