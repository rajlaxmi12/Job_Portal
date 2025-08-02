import React from 'react'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '../utils/constant';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills.join(", ") || "",
        file: user?.profile?.resume || null
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
    
    const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);
        if (input.file) {
            formData.append('file', input.file);
        }
        setLoading(true);
        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
        console.log(input);
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='name' className='text-right'>Name</Label>
                                <Input id='name' type='text' className='col-span-3' name='fullname' value={input.fullname} onChange={changeEventHandler}></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='email' className='text-right'>Email</Label>
                                <Input id='email' type='email' className='col-span-3' name='email' value={input.email} onChange={changeEventHandler}></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='number' className='text-right'>Number</Label>
                                <Input id='number' className='col-span-3' name='phoneNumber' value={input.phoneNumber} onChange={changeEventHandler}></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='bio' className='text-right'>Bio</Label>
                                <Input id='bio' className='col-span-3' name='bio' value={input.bio} onChange={changeEventHandler}></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='skills' className='text-right'>Skills</Label>
                                <Input id='skills' className='col-span-3' name='skills' value={input.skills} onChange={changeEventHandler}></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='file' className='text-right'>Resume</Label>
                                <Input type='file' id='file' className='col-span-3' name='file' accept='application/pdf' onChange={fileChangeHandler}></Input>
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className='w-full my-4 bg-[#6A38C2]'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait...</Button>
                                    : <Button type='submit' className='w-full my-4 bg-[#6A38C2] hover:bg-[#5b30a6] text-white'>Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog