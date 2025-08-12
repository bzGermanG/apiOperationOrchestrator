import express from 'express';
import Tier from './copTierRoute.js';
import Region from './copRegionRoute.js';
import Product from './copProductRoute.js';
import Category from './copCategoryRoute.js';
import EnvCategory from './copEnvCategoryRoute.js';
import Recipes from './copRecipesRoute.js';

const router = express.Router();

//Tier
router.use("/Tiers", Tier);
console.log("ROUTE: /v1/Metadata/Tiers");

//Regions
router.use("/Regions", Region);
console.log("ROUTE: /v1/Metadata/Regions");

//Products
router.use("/Products", Product);
console.log("ROUTE: /v1/Metadata/Products");

//Categories
router.use("/Categories", Category);
console.log("ROUTE: /v1/Metadata/Categories");

//EnvCategories
router.use("/EnvCategories", EnvCategory);
console.log("ROUTE: /v1/Metadata/EnvCategories");

//Recipes
router.use("/Recipes", Recipes);
console.log("ROUTE: /v1/Metadata/Recipes");

export default router; 