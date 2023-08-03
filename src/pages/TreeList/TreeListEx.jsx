import React, { useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

const products = [
  {
    ProductID: 1,
    ProductName: "Chai",
    SupplierID: 1,
    CategoryID: 1,
    QuantityPerUnit: "10 boxes x 20 bags",
    UnitPrice: 18.0,
    UnitsInStock: 39,
    UnitsOnOrder: 0,
    ReorderLevel: 10,
    Discontinued: false,
    Category: {
      CategoryID: 1,
      CategoryName: "Beverages",
      Description: "Soft drinks, coffees, teas, beers, and ales",
    },
  },
  {
    ProductID: 2,
    ProductName: "Chang",
    SupplierID: 1,
    CategoryID: 1,
    QuantityPerUnit: "24 - 12 oz bottles",
    UnitPrice: 19.0,
    UnitsInStock: 17,
    UnitsOnOrder: 40,
    ReorderLevel: 25,
    Discontinued: false,
    Category: {
      CategoryID: 1,
      CategoryName: "Beverages",
      Description: "Soft drinks, coffees, teas, beers, and ales",
    },
  },
  {
    ProductID: 3,
    ProductName: "Aniseed Syrup",
    SupplierID: 1,
    CategoryID: 2,
    QuantityPerUnit: "12 - 550 ml bottles",
    UnitPrice: 10.0,
    UnitsInStock: 13,
    UnitsOnOrder: 70,
    ReorderLevel: 25,
    Discontinued: false,
    Category: {
      CategoryID: 2,
      CategoryName: "Condiments",
      Description: "Sweet and savory sauces, relishes, spreads, and seasonings",
    },
  },
];

const DetailComponent = (props) => {
  const dataItem = props.dataItem;
  return (
    <section>
      <p>
        <strong>In Stock:</strong> {dataItem.UnitsInStock} units
      </p>
      <p>
        <strong>On Order:</strong> {dataItem.UnitsOnOrder} units
      </p>
      <p>
        <strong>Reorder Level:</strong> {dataItem.ReorderLevel} units
      </p>
      <p>
        <strong>Discontinued:</strong> {dataItem.Discontinued}
      </p>
      <p>
        <strong>Category:</strong> {dataItem.Category.CategoryName} -{" "}
        {dataItem.Category.Description}
      </p>
    </section>
  );
};

const TreeListEx = () => {
  const [data, setData] = React.useState(products);
  const expandChange = (event) => {
    let newData = data.map((item) => {
      if (item.ProductID === event.dataItem.ProductID) {
        item.expanded = !event.dataItem.expanded;
      }
      return item;
    });
    setData(newData);
  };
  return (
    <Grid
      data={data}
      detail={DetailComponent}
      style={{
        height: "400px",
      }}
      expandField="expanded"
      onExpandChange={expandChange}
    >
      <Column field="ProductName" title="Product" width="300px" />
      <Column field="ProductID" title="ID" width="50px" />
      <Column field="UnitPrice" title="Unit Price" width="100px" />
      <Column field="QuantityPerUnit" title="Qty Per Unit" />
    </Grid>
  );
};

export default TreeListEx;
