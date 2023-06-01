import { GET_STACK_DATA, SET_STACK_DATA } from "./action";

const initialState = {
  StackData: [],
  filteredData: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STACK_DATA:
      return {
        ...state,
        StackData: action.payload,
      };

    case SET_STACK_DATA:

    const data = state.StackData.map((eachObj) => {
      return {
        tags: eachObj.tags,
        view_count: eachObj.view_count,
        title: eachObj.title,
      };
    });

      const tagData = {};
      data.forEach((item) => {
        const { tags, view_count } = item;

        tags.forEach((tag) => {
          if (!tagData[tag]) {
            tagData[tag] = {
              count: 0,
              totalViews: 0,
            };
          }
          
          tagData[tag].count++;
          tagData[tag].totalViews += view_count;
        });
      });

      const result = Object.entries(tagData).map(
        ([tag, { count, totalViews }]) => ({
          tag,
          count,
          averageViews: Math.ceil(totalViews / count),
        })
      );

      const sortedResult = result.sort((a, b) => {
        return b.count - a.count;
      });
      return {
        ...state,
        filteredData: sortedResult.slice(0, 5),
      };
    default:
      return state;
  }
};

export default reducer;
