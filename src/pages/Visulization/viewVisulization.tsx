import { useEffect, useState } from "react";
import { Visulization, VisulizationFilters } from "../../models/models";
import { fetchVisulizations } from "../../services/apiService";
import VisulizationCard from "../../components/visulizationCard";
import moment from "moment";

function ViewVisulization() {
  const [visualizations, setVisualizations] = useState<Visulization[] | null>(
    []
  );
  const [filters, setFilters] = useState<VisulizationFilters>({});
  const [selectedFilter, setSelectedFilter] = useState<string>("1");

  useEffect(() => {
    fetchVisulizations(filters)
      .then((res) => {
        if (res.isSuccess) {
          setVisualizations(res.data);
        } else {
          console.error(res.errorMessage);
        }
      })
      .catch((err) => console.error(err));
  }, [filters]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value;
    setSelectedFilter(val);
    console.log(val);

    switch (val) {
      case "2":
        setFilters({ IsTrending: true });
        break;
      case "3":
        setFilters({
          IsTrending: true,
          FromDate: moment().format(),
          ToDate: moment().format(),
        });
        break;
      case "4":
        setFilters({ IsViewsDecending: true });
        break;
      case "5":
        setFilters({ IsVoteDecending: true });
        break;
      default:
        setFilters({});
        break;
    }
  };
  return (
    <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="flex items-center justify-between mb-8">
        <div>
          <select
            className="px-4 py-2 rounded-md bg-gray-200"
            value={selectedFilter}
            onChange={handleChange}
          >
            <option value="1">All</option>
            <option value="2">All Time Trending</option>
            <option value="3">Today's Trending</option>
            <option value="4">Most Viewed</option>
            <option value="5">Most Voted</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
        {visualizations?.map((visualization) => (
          <div key={visualization.id} className="w-full max-w-sm">
            <VisulizationCard visulization={visualization} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewVisulization;
