import { DetailsProductItems } from "./DetailsProductItems";

interface VehicleDetailsProps {
  highlights: string[];
  equipment: string[];
  modification: string[];
  recentServiceHistory: string[];
  otherItemsIncludedInSale: string[];
  sellerNotes: string[];
  videos: string[];
}

export function DetailProductItemParents({
  product,
}: {
  product: VehicleDetailsProps;
}) {
  const {
    highlights,
    equipment,
    modification,
    recentServiceHistory,
    otherItemsIncludedInSale,
    sellerNotes,
    videos,
  } = product || {};



  return (
    <div className="space-y-8">
      <DetailsProductItems title="Highlights" items={highlights} />
      <DetailsProductItems title="Equipment" items={equipment} />
      <DetailsProductItems title="Modifications" items={modification} />
      <DetailsProductItems
        title="Recent Service History"
        items={recentServiceHistory}
      />
      <DetailsProductItems
        title="Other Items Included in Sale"
        items={otherItemsIncludedInSale}
      />
      <DetailsProductItems title="Seller Notes" items={sellerNotes} />
      {/* {videos?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold">Videos</h3>
          <div className="space-y-4">
            {videos.map((video, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg"
                style={{ paddingTop: "56.25%" }} // Maintain 16:9 aspect ratio
              >
                <iframe
                  src={video}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
