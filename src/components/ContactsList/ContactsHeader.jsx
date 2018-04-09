import React from "react";
import PropTypes from "prop-types";
import { withGroups } from "../../connections/allGroups";
import SelectBox from "cozy-ui/react/SelectBox";

const ContactsFilter = ({ groups, onFilterChange }) => (
  <div>
    <SelectBox
      hideSelectedOptions={false}
      isSearchable={false}
      tabSelectsValue={false}
      noOptionsMessage={() => t("groups.none")}
      options={groups}
      onChange={onFilterChange}
      getOptionLabel={group => group.name}
      getOptionValue={group => group._id}
    />
  </div>
);

const ContactsFilterWithLoading = ({ data, fetchStatus, ...props }) => {
  if (fetchStatus === "error") {
    return false;
  } else if (fetchStatus === "loading" || fetchStatus === "pending") {
    return <div>Loading...</div>;
  } else {
    return <ContactsFilter groups={data} {...props} />;
  }
};

const ConnectedContactsFilter = withGroups(ContactsFilterWithLoading);

const ContactsHeader = ({ onFilterChange, renderActions }) => (
  <div className="topbar">
    <div className="topbar__left">
      <ConnectedContactsFilter onFilterChange={onFilterChange} />
    </div>
    <div className="topbar__right">{renderActions()}</div>
  </div>
);
ContactsHeader.propTypes = {
  renderActions: PropTypes.func.isRequired
};

export default ContactsHeader;
