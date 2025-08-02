// import React, { useEffect, useState } from 'react'
// import {
//     Table,
//     TableHead,
//     TableRow,
//     TableCaption,
//     TableHeader,
//     TableBody,
//     TableCell
// } from '../ui/table'
// import { Popover } from '../ui/popover'
// import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
// import { MoreHorizontal, Edit2 } from 'lucide-react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'


// const AdminJobsTable = () => {
//     const { companies, searchCompanyByText } = useSelector(store => store.company);
//     const {allAdminJobs} = useSelector(store=>store.job);
//     const [filterJobs, setFilterJobs] = useState(allAdminJobs);
//     const navigate = useNavigate();
//     //YOUTUBE ONE
//     // useEffect(()=>{
//     //   const filteredCompany = companies.length === 0 && companies.filter((company)=>{
//     //     if(!searchCompanyByText){
//     //       return null;
//     //     };
//     //     return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
//     //   });
//     //   setFilterCompany(filteredCompany);
//     // },[companies,searchCompanyByText])
//     //SELF WRITTEN
//     useEffect(() => {
//         const filteredCompany = !searchCompanyByText
//             ? allAdminJobs
//             : allAdminJobs.filter(job =>
//                 job?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
//             );
//         setFilterJobs(filteredCompany);
//     }, [companies, searchCompanyByText]);

//     return (
//         <div>
//             <Table>
//                 <TableCaption>A list of your recently posted Jobs</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Company Name</TableHead>
//                         <TableHead>Role</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {
//                         filterJobs?.map((job) => (
//                             <tr>
//                                 <TableCell>{job.title}</TableCell>
//                                 <TableCell>{job.createdAt.split("T")[0]}</TableCell>
//                                 <TableCell className="text-right cursor-pointer">
//                                     <Popover>
//                                         <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
//                                         <PopoverContent className='w-32'>
//                                             <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
//                                                 <Edit2 className='w-4' />
//                                                 <span>Edit</span>
//                                             </div>
//                                         </PopoverContent>
//                                     </Popover>
//                                 </TableCell>
//                             </tr>
//                         ))
//                     }
//                 </TableBody>
//             </Table>
//         </div>
//     );
// };

// export default AdminJobsTable;
//NEWLY WRITTEN AGAIN FOR REDUCING THE ERROR
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCaption,
  TableHeader,
  TableBody,
  TableCell
} from '../ui/table';
import { Popover } from '../ui/popover';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { MoreHorizontal, Edit2, Eye } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  // Make sure these are populated correctly in your Redux store!
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs || []);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = !searchJobByText
      ? allAdminJobs
      : allAdminJobs?.filter(job =>
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    setFilterJobs(filteredJobs || []);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recently posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs && filterJobs.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job.createdAt ? job.createdAt.split("T")[0] : 'N/A'}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className='w-32 bg-white'>
                      <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                        <Edit2 className='w-4' />
                        <span>Edit</span>
                      </div>
                      <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 w-fit cursor-pointer mt-2'>
                        <Eye className='w-4' />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
