"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validator(options) {
    const tocConfig = options.config.toc;
    const errors = [];
    if (!tocConfig.insertSelector.length) {
        errors.push('Option "insertSelector" for "toc" must be a valid string (e.g. "#toc").');
    }
    if (!tocConfig.blogAreaSelector.length) {
        errors.push('Option "blogAreaSelector" for "toc" must be a valid string (e.g. ".blog-content").');
    }
    if (tocConfig.level && !tocConfig.level.length) {
        errors.push(`Option "level" for "toc" must be an array containing headings to list (e.g.: "['h2', 'h3']".`);
    }
    return errors;
}
exports.validator = validator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9jLXZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90b2MtdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsU0FBZ0IsU0FBUyxDQUFDLE9BQXdCO0lBQ2hELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ3JDLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUU1QixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FDVCx5RUFBeUUsQ0FDMUUsQ0FBQztLQUNIO0lBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FDVCxvRkFBb0YsQ0FDckYsQ0FBQztLQUNIO0lBRUQsSUFBSSxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDOUMsTUFBTSxDQUFDLElBQUksQ0FDVCw4RkFBOEYsQ0FDL0YsQ0FBQztLQUNIO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQXZCRCw4QkF1QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2NIYW5kbGVkUm91dGUgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdG9yKG9wdGlvbnM6IFRvY0hhbmRsZWRSb3V0ZSkge1xuICBjb25zdCB0b2NDb25maWcgPSBvcHRpb25zLmNvbmZpZy50b2M7XG4gIGNvbnN0IGVycm9yczogc3RyaW5nW10gPSBbXTtcblxuICBpZiAoIXRvY0NvbmZpZy5pbnNlcnRTZWxlY3Rvci5sZW5ndGgpIHtcbiAgICBlcnJvcnMucHVzaChcbiAgICAgICdPcHRpb24gXCJpbnNlcnRTZWxlY3RvclwiIGZvciBcInRvY1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgKGUuZy4gXCIjdG9jXCIpLicsXG4gICAgKTtcbiAgfVxuXG4gIGlmICghdG9jQ29uZmlnLmJsb2dBcmVhU2VsZWN0b3IubGVuZ3RoKSB7XG4gICAgZXJyb3JzLnB1c2goXG4gICAgICAnT3B0aW9uIFwiYmxvZ0FyZWFTZWxlY3RvclwiIGZvciBcInRvY1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgKGUuZy4gXCIuYmxvZy1jb250ZW50XCIpLicsXG4gICAgKTtcbiAgfVxuXG4gIGlmICh0b2NDb25maWcubGV2ZWwgJiYgIXRvY0NvbmZpZy5sZXZlbC5sZW5ndGgpIHtcbiAgICBlcnJvcnMucHVzaChcbiAgICAgIGBPcHRpb24gXCJsZXZlbFwiIGZvciBcInRvY1wiIG11c3QgYmUgYW4gYXJyYXkgY29udGFpbmluZyBoZWFkaW5ncyB0byBsaXN0IChlLmcuOiBcIlsnaDInLCAnaDMnXVwiLmAsXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBlcnJvcnM7XG59XG4iXX0=