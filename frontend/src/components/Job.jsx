import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from "@/components/ui/avatar"

const Job = ({job}) => {
  const navigate = useNavigate();
  //const jobId = "qwertyuioplkjhgfdsazxcvbnm";
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const now = new Date();
    const timeDiff = now.getTime() - createdAt.getTime();
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysAgo;
  }

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>
        <p className='text-gray-500 text-sm'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : daysAgoFunction(job?.createdAt) + " days ago"}</p>
        <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className='p-6' variant='outline' size='icon'>
          <Avatar>
            <AvatarImage
              src={job?.company?.logo}
              
            />
          </Avatar>
        </Button>
        <div>
          <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>
      <div>
        <h1 className='text-lg font-bold my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>
          {job?.description}
        </p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant='ghost'>{job?.position} Positions</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant='ghost'>{job?.jobType}</Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant='ghost'>{job?.salary} lpa</Badge>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Button onClick={() => navigate(`/description/${job?._id}`)}>View Details</Button>
        <Button className='bg-[#7209b7]'>Save for Later</Button>
      </div>
    </div>
  )
}

export default Job