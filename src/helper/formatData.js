/**
 * cate =>
 * map over tree
 * group : get name  => push into object label
 * subcate => id : value , name : label  => array Of Objects
 * [{
 *   label : group
 *   options : subCate
 * }]
 */
export const formatData = (data) => {
  const options = [];

  data.map((item) => {
    let groupOptions = [];
    let group = {};
    group.label = item.name;

    item.sub_categories.map((sub) => {
      let subCate = {};
      subCate.label = sub.name;
      subCate.value = sub.id;

      return groupOptions.push(subCate);
    });

    group.options = groupOptions;
    return options.push(group);
  });

  return options;
};

export const formatDataFlat = (data) => {
  const options = [];

  data.map((item) => {
    options.push({ label: item.name, value: item.id });
    return item.sub_categories.map((sub) =>
      options.push({ label: sub.name, value: sub.id })
    );
  });
  return options;
};
