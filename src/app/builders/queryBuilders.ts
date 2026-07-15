// import { Query } from "mongoose";

// // create a query builder 
// class QueryBuilder<T> {
//     constructor(
//         public modelQuery: Query<T[], T>, // this is mongosse query
//         public query: Record<string, unknown>, // this is obj query
//     ){}
//     // search sec
//     search( searchAbleFilds: string[] ){
//         const searchTerm = this.query.searchTerm as string;

//         if(searchTerm){
//             this.modelQuery.find({
//                 $or: searchAbleFilds.map((field)=>({
//                     [field]: {$regex: searchTerm, $options: "i"}
//                 }))
//             })
//         }

//         return this;
//     }

//     //filter
//     fliter(){
//         const queryObj = {...this.query}

//         // excloud methods
//         const excloudsFields= ['searchTerm','sort','limit','page','skip','fields']
//         excloudsFields.forEach((el) => delete queryObj[el])

//         this.modelQuery = this.modelQuery.find(queryObj);
//         return this
//     }

//     //sorting
//     sort(){
//         const sort = (this.query.sort as string)?.split(',').join(' ')||'-createdAt';
//         this.modelQuery = this.modelQuery.sort(sort);
//         return this;
//     }
//     //pagenetion
//     paginet(){
//         const page = Number(this.query.page)|| 1;
//         const limit = Number(this.query.limit)||1;
//         const skip= (page-1)*limit;

//         this.modelQuery = this.modelQuery.skip(skip).limit(limit);
//         return this;

//     }
//     //fields
//     fields(){
//         const fields = (this.query.fields as string).split(',').join(' ');
//         this.modelQuery = this.modelQuery.select(fields);
//         return this;
//     }
   
// }

// export default QueryBuilder;