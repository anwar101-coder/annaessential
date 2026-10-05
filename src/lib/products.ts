import blackSeedImage from "@/assets/Black_Seed_Hair_Growth_Oil_Apothecary_Ad.png.asset.json";
import castorImage from "@/assets/Anna_Castor_Oil_Botanical_Display.png.asset.json";
import frankincenseImage from "@/assets/Frankincense_Essential_Oil_Still_Life.png.asset.json";
import myrrhImage from "@/assets/Anna_Myrrah_Essential_Oil_Still_Life.png.asset.json";
import rosemaryImage from "@/assets/Natural_Rosemary_Hair_Oil_with_Dropper_Cap.png.asset.json";

export type Product = {
  id: string;
  name: string;
  price: number;
  size: string;
  description: string;
  image: string;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: "rosemary-hair-oil",
    name: "Anna Rosemary Hair Oil",
    price: 1200,
    size: "100 ml",
    description: "A carefully presented rosemary hair oil made for a simple, intentional hair-care ritual.",
    image: rosemaryImage.url,
    featured: true,
  },
  {
    id: "black-seed-hair-oil",
    name: "Anna Black Seed Hair Oil",
    price: 1200,
    size: "100 ml",
    description: "Pure black seed oil in an easy-to-use dropper bottle for your regular hair-care routine.",
    image: blackSeedImage.url,
    featured: true,
  },
  {
    id: "castor-oil",
    name: "Anna Castor Oil",
    price: 1200,
    size: "100 ml",
    description: "Pure and natural castor oil, bottled for focused care of hair and dry areas.",
    image: castorImage.url,
    featured: true,
  },
  {
    id: "frankincense-essential-oil",
    name: "Anna Frankincense Essential Oil",
    price: 800,
    size: "30 ml",
    description: "A richly aromatic frankincense essential oil for a calm, considered home ritual.",
    image: frankincenseImage.url,
    featured: false,
  },
  {
    id: "myrrh-essential-oil",
    name: "Anna Myrrh Essential Oil",
    price: 800,
    size: "30 ml",
    description: "A warm, resinous myrrh essential oil presented in a precise dropper bottle.",
    image: myrrhImage.url,
    featured: false,
  },
];