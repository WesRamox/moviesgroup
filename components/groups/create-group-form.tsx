import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function CreateGroupForm() {
  return (
    <form>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="group-name-1">Group Name</Label>
          <Input id="group-name-1" name="group-name" defaultValue="The Best's" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description-1">Description</Label>
          <Input id="description-1" name="description" defaultValue="This is a test" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="´type-1">Type Group</Label>
          <Select>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="couple">Couple</SelectItem>
                <SelectItem value="friends">Friends</SelectItem>
                <SelectItem value="family">Family</SelectItem>
              </SelectContent>
            </Select>
          </Select>
        </div>
      </div>
    </form>
  )}