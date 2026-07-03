# User Schema

- name : String
- email : String
- password : String
- department : String
- role : employee | manager
- leaveBalance

# Leave Schema

- employee : ObjectId
- leaveType : String
- startDate : Date
- endDate : Date
- reason : String
- status : Pending | Approved | Rejected
- managerComments : String