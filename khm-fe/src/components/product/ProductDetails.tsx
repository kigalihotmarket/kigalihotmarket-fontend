import { Dispatch, FC, SetStateAction } from "react";
import { IProduct } from "../../types/common";
import { format } from "date-fns";
import { formatNumberWithCommas } from "@/utils/formats/formats";

interface IProductForm {
  product?: IProduct;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isView?: boolean;
}

const ProductDetails: FC<IProductForm> = ({ product }) => {

  return (
    <form className='p-1 bg-white'>
      <div className='w-full bg-white p-8 rounded-md'>
        <div className='grid gap-3'>
          <div className={`grid gap-4`}>
            <div className={``}>
              <div className='grid gap-3'>
                <div className='py-2'>
                  <div className='font-bold'>Product Info</div>
                </div>
                <List label='Product Name' value={product?.name ?? "N/A"} />
                <List label='Description' value={product?.description ?? "N/A"} />
                <List label='Price' value={formatNumberWithCommas(product?.price) ?? "N/A"} />
                <List label='Teaser' value={product?.teaser ?? "N/A"} />
                <List label='Model' value={product?.model ?? "N/A"} />
                <List label='Warranty' value={product?.warranty ?? "N/A"} />
                <List
                  label='Features'
                  value={
                    [
                      product?.featuresOne,
                      product?.featuresTwo,
                      product?.featuresThree,
                      product?.featuresFour,
                      product?.featuresFive,
                      product?.featuresFix,
                      product?.featuresSeven,
                      product?.featuresEight,
                      product?.featuresNine,
                      product?.featuresTen,
                    ].filter((feature) => feature)
                  }
                />
                <List label='Discount Percentage' value={product?.discountPercentage ?? "N/A"} />
                <List label='Category' value={product?.category ?? "N/A"} />
                <List label='Brand' value={product?.brand ?? "N/A"} />
                <List label='Stock Quantity' value={product?.stockQuantity ?? "N/A"} />
                <List label='Active Status' value={product?.isActive ? "Active" : "Inactive"} />
                <List label='Thumbnail' value={product?.thumbnail ?? "N/A"} />
                <List label='Gallery Images' value={product?.galleryImages ?? []} />
                <List label='Rating' value={product?.rating ?? "N/A"} />
                <List
                  label='Created At'
                  value={product?.createdAt ? format(new Date(product.createdAt), "dd-MM-yyyy") : "N/A"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const List = ({ label, value }: { label: string; value: string | number | string[] | null }) => {
  return (
    <div className='grid sm:grid-cols-2 gap-2'>
      <div className='text-gray-500'>{label}</div>
      <div className='text-gray-900'>
        {label === 'Thumbnail' && value ? (
          <img src={String(value)} alt={`${label}`} className='w-16 h-16 rounded-full' />
        ) : label === 'Gallery Images' && Array.isArray(value) ? (
          <div className='flex gap-2'>
            {value.map((img, index) => (
              <img key={index} src={img} alt={`${label} ${index + 1}`} className='w-16 h-16 rounded-md' />
            ))}
          </div>
        ) : label === 'Features' && Array.isArray(value) ? (
          <ul className='list-disc pl-5'>
            {value.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
