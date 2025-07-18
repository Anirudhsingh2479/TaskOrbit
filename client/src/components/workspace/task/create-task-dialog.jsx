import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog';
import { Button } from '../../ui/button';
import CreateTaskForm from "./create-task-form";

const CreateTaskDialog = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  
  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            New Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
          <CreateTaskForm projectId={props.projectId} onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTaskDialog;
