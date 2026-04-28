// No TypeScript imports - just plain React!
import {
  Table,
  TableBody,
  //TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import React from "react";
import { fetchProducts } from "@/helpers/ProductsApi";
import { useEffect } from "react";
import AddProductForm from "../AddProductForm";


const Products = () => {

  const [products, setProducts] = React.useState([]);
  const [totalproducts, setTotalproducts] = React.useState(0);
  const limit = 10;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showAddProductForm, setShowAddProductForm] = React.useState(false);
  const totalpages = Math.ceil(totalproducts / limit)

  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       try {
  //         const userdata = await GetIndividualUser();
  //         setUser(userdata);
  //       } catch (error) {
  //         console.log("User fetch failed");
  //         // maybe redirect to login
  //       }
  //     };

  //     fetchUser();
  //   }, []);

  useEffect(() => {
    const Products = async () => {
      try {
        const skip = (currentPage - 1) * limit;
        const productsdata = await fetchProducts(skip, limit);
        console.log(productsdata)

        setProducts(productsdata.data)
        setTotalproducts(productsdata.total)
        //setLoading(false)
      }
      catch (e) {
        console.log('products fetching failed', e)
      }
    }

    Products();
  }, [currentPage])

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleAddProductClick = () => {
    setShowAddProductForm(true); // Show the Add Product form
  };

  // console.log('products', products)
  // console.log('currentpage', currentPage)
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={handleAddProductClick}
          className="px-5 py-2 bg-gray-500 text-white font-semibold font-sans rounded-md cursor-pointer"
        >
          Add Product
        </button>
      </div>
      
      <Table>
        {/* <TableCaption>Products</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Team</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium">{product.brandname}</TableCell>
              <TableCell className=' text-green-600 rounded-lg'>Available</TableCell>
              <TableCell>{product.brandprice}</TableCell>
              <TableCell className="text-center">{product.teamname ? product.teamname : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="text-2xl mt-2">
        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (currentPage !== 1) prevPage();
                }}
                className={`cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`} />
            </PaginationItem>
            {Array.from({ length: totalpages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className="cursor-pointer hover:bg-gray-200"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => { if (currentPage != totalpages) nextPage() }}
                className={`cursor-pointer ${currentPage == totalpages ? "cursor-not-allowed opacity-50" : ""}`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {showAddProductForm && <AddProductForm onClose={() => setShowAddProductForm(false)} />}
    </div>

  )
}

export default Products;