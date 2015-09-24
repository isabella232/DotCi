import createAction from './createAction.js';
export default class {
  constructor(){
    this.query={
      filter: 'All',
      limit: 50
    }
    this.dirty = true;
    const self = this;
    this.actions =  {
      QueryChange : createAction((data,onAction) =>{
        Object.assign(self.query,data);
        this.dirty = true;
        onAction(self);
      }),
      DataChange : createAction((data,callBack)=>{
        Object.assign(self,data);
        this.dirty=false;
        callBack(self);
      }),
      RemoveFilter : createAction((removedFilter,callBack)=>{
        //-------- Optimistic Update
        const idx = self.filters.indexOf(removedFilter);
        self.filters.splice(idx, 1);
        self.actions.DataChange(self);
        //---------------
        callBack(removedFilter);
      }),
      AddFilter: createAction((newFilter,callBack)=>{
        //-------- Optimistic Update
        self.filters.push(newFilter);
        self.actions.DataChange(self);
        //---------------
        callBack(newFilter);
      })
    }
  }
}