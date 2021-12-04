import React from "react";
import { FilterCategories, FilterProposals, FilterTimeline } from "../index";
import style from "./filterBar.module.scss";

function FilterBar({
  selectedFilter,
  onFilterChange,
  type,
  selectedProposal,
  selectedTimeline,
}) {
  return (
    <div className={style.filterBar}>
      <h5>تصفيةبــ</h5>
      <FilterCategories
        selectedFilter={selectedFilter}
        onFilterChange={onFilterChange}
      />

      {type === "projects" && (
        <>
          <FilterProposals
            onFilterChange={onFilterChange}
            selectedProposal={selectedProposal}
          />
          <FilterTimeline
            onFilterChange={onFilterChange}
            selectedTimeline={selectedTimeline}
          />
        </>
      )}

      {/* {type === "freelancers" && (
        <>
          <FilterLocations
            selectedLocations={selectedLocations}
            onFilterChange={onFilterChange}
          />
          <FilterLanguage
            selectedLanguage={selectedLanguage}
            onFilterChange={onFilterChange}
          />
          <FilterSkills
            onFilterChange={onFilterChange}
            selectedSkills={selectedSkills}
          />
          <FilterRating
            onFilterChange={onFilterChange}
            selectedRating={selectedRating}
          />
        </>
      )} */}
    </div>
  );
}

export default FilterBar;
