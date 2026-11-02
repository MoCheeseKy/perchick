import DetailProductsView from "@/components/_views/Products/DetailProducts";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <DetailProductsView id={id} />;
}
