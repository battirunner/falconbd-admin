import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import ProductOne from '../../images/product/product-01.png';
import ProductTwo from '../../images/product/product-02.png';
import ProductThree from '../../images/product/product-03.png';
import ProductFour from '../../images/product/product-04.png';
import { Product } from '../../types/product';

const productData: Product[] = [
  {
    image: ProductOne,
    name: 'Apple Watch Series 7',
    category: 'Electronics',
    price: 296,
    sold: 22,
    profit: 45,
  },
  {
    image: ProductTwo,
    name: 'Macbook Pro M1',
    category: 'Electronics',
    price: 546,
    sold: 12,
    profit: 125,
  },
  {
    image: ProductThree,
    name: 'Dell Inspiron 15',
    category: 'Electronics',
    price: 443,
    sold: 64,
    profit: 247,
  },
  {
    image: ProductFour,
    name: 'Singapore',
    category: 'Tourist Visa',
    price: 5000,
    sold: 72,
    profit: 103,
  },
];

const TableTwo = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Sold</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Profit</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Profit</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Profit</p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={product.image} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.category}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.sold}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${product.profit}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${product.profit}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex">
              <button className="mx-2 text-blue-500 w-4">
                <EditOutlined style={{ fontSize: '24px' }} />
              </button>
              <button className="mx-2 text-red-500 w-4 ">
                <DeleteOutlined style={{ fontSize: '24px' }} />
              </button>
              <button className="mx-2 text-blue-500 w-4">
                <EyeOutlined style={{ fontSize: '24px' }} />
              </button>
            </div>
            {/* <p className="text-sm text-meta-3">${product.profit}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
