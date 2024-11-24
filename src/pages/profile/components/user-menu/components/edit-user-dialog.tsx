import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms/auth';

const EditUserDialog: React.FC = () => {
  const user = useAtomValue(userAtom);

  return (
    <Dialog>
      <DialogTrigger className='flex items-center'>
        <Settings className='mr-2 h-4 w-4' />
        <span>User settings</span>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='full_name_en' className='text-right'>
              Full Name (English)
            </Label>
            <Input
              id='full_name_en'
              value={user?.userInfo?.full_name_en || ''}
              className='col-span-3'
              readOnly
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='full_name_ka' className='text-right'>
              Full Name (Georgian)
            </Label>
            <Input
              id='full_name_ka'
              value={user?.userInfo?.full_name_ka || ''}
              className='col-span-3'
              readOnly
            />
            =
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
