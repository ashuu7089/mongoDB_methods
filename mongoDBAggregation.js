// 1) Find the total number fo all male or female

[
    {
        $group : {
            _id : "$gender", //represent $ for fields
            count : {
                $sum: 1 
            }
        }
    }
]



//  2) Which country has the highest number of registered users
[
    {
        $group: {
            _id : "$company.location.country",
            count : {
                $sum : 1
            }
        },
    },
    {
     $sort : {
        userCount : -1
     },
     $limit : 2        
    }
]

// 3) List all unique eye colors present in the collection

[
    {
        $group : {
            _id : "$eyeColor"
        }
    }
]


// 4) What is average number of tags per user
[
    {
        $unwind : "$tags"
    },{
        $group : {
            _id : "$_id",
            numberOfTags : { $sum : 1}
        }
    },{
        $group : {
            _id : null,
            averageNumberOfTag : { $avg: "$numberOfTags"}
        }
    }
]

// Other solution for same question
[
    {
        $addFields:{
            numberOfTags : {
                $size: {$ifNull :["$tags", []]}
            }
        }
    },{
        $group : {
            _id : null,
            averageNumberOfTag : { $avg: "$numberOfTags"}
        }
    }
]


// 5)  How many users have 'enim' as one of their tags?
[
    {
        $match:{
            tags: 'id'
        }
    },{
        $count : 'userWithEnimTag'
    }
]

//  6) What are names and age of users who are iactive  and have 'veit' as a tags?
[
    {
        $match : {
            isActive : false, tags :'velit'
        }
    },{
        $project : {
            name : 1,
            age :1
        }
    }
]

// 7) How many users have a phone number starting with '+1 (640)
[
    {
        $match: {
            "company.phone": "/^/+1 \(940/)/"
        }
    },
    {
        $count: 'userWithSpecialPhoneNumber'
    }
]

// 8) // List of the top 5 most common favourite fruits among the people
[
    {
        $group: {
            _id : "$fravouritFruit",
            count : {
                $sum : 1
            }
        }
    },
    {
        $sort : {
            count : -1
        }
    },{
        $limit : 2
    }
] 
// 1) grouping the fravouriteFruit
// 2) sort the fravouriteFruit
// 3) limit


// 9) What is average age of all users.
[
    {
        $group: {
            _id: null,
            averageAge : {
                $avg:"Age"
            }
        }
    }
]

// 10 ) Who has registered the most recently ?
[
    {
        $sort :{
            registered: -1
        }
    },{
        $limit : 4
    },{
        $project: {
            name : 1,
            registered: 1,
            favoriteFruits: 1
        }
    }
]

// 11) categorized users by their favorite fruit ?

[
    {
        $group : {
          _id :"$favoriteFruits",
          users: {
            $push:  "$name"
          }
        }
    }
]

// 12) How many users have 'ad' as the second tag in their list of tags?

[
    {
        $match :{
            "tags.1" : 'ad'
        }
    },{
        $count : "tagSecondAd"
    }
]

// 13) Find Users who have both enim and id as their tags.
[
    {
        $match : {
            tags :{
                $all : ['enim', 'id']
            }
        }
    }
]

// 14) List all companies located in the USA with their corresponding user count.

[
    {
        $match : {
            "company.location.country"  :"USA"
        }
    },{
        $group : {
            _id : "null", //company.title
            userCount : {$sum: 1}
        }
    }
]


// 15) LOOKUP
[
    {
        $lookup: {
            from : "authors",
            localField: "author_id",
            foreignField: "_id",
            as : 'author_details'
        }
    },{
        $addFields:{
            author_details : {
                $first:"$author_details" // or $arrElemAt : ["author_details", 0]
            }
        }
    }
]