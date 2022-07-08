import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { BUTTON_TYPE } from "../components/Constant";
import Form from "./Form";
import useData from "./hooks/useData";
import useEdit from "./hooks/useEdit";

const Todo = () => {
  const { data, changeData, clear } = useData("");
  const [dataList, setDataList] = useState([]);
  
  const [filterList, setFilterList] = useState([]);
  const { edit, changeEdit, editClear } = useEdit("");
  const [isFilterClicked, setFilterClicked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataList((prev) => {
      return [...prev, { id: Math.random(), name: data, isCompleted: false }];
    });
    clear();
  };
  const handleCheck = (id) => {
    const updatedList = dataList.map((val) => {
      if (id === val.id) {
        return {
          ...val,
          isCompleted: !val.isCompleted,
        };
      } else return val;
    });
    setDataList(updatedList);
  };

    const deleteFilterList = (id) => {
      console.log("delete button clicked", id);
      const list = filterList
        .filter((val) => val.id !== id)
        .map((val) => {
          return val;
        });
      setFilterList(list);
    };

  const deleteList = (id) => {
    console.log("delete button clicked", id);
    const list = dataList
      .filter((val) => val.id !== id)
      .map((val) => {
        return val;
      });
    setDataList(list);
  };

  const buttonList = ({ type }) => {
    console.log(type, "type");
    if (type === "Complete") {
      setFilterClicked(true);
      const completeList = dataList.filter((val) => val.isCompleted);
      setFilterList(completeList);
    } else if (type === "Incomplete") {
      setFilterClicked(true);
      const incompleteList = dataList.filter((val) => !val.isCompleted);

      setFilterList(incompleteList);
    } else {
      setFilterClicked(false);
      let allList = dataList.map((val) => {
        return val;
      });
      setFilterList(allList);
    }
  };
  const editList = (id) => {
    changeEdit(id);
  };

   const handleFilterEdit = (e) => {
     const updateEdit = filterList.map((val) => {
       if (val.id === edit) {
         return {
           ...val,
           name: e.target.value,
         };
       } else return val;
     });
     setFilterList(updateEdit);
   };
 
     const blurChange = () => {
       editClear();
     };

     const editFilterList=(id)=>{
      changeEdit(id);
     }

  const handleEdit = (e) => {
    const updateEdit = dataList.map((val) => {
      if (val.id === edit) {
        return {
          ...val,
          name: e.target.value,
        };
      } else return val;
    });
    setDataList(updateEdit);
  };

 
  useEffect(() => {
    console.log("setItem called", dataList);
    if (dataList.length > 0) {
      localStorage.setItem("list", JSON.stringify(dataList));
    }
  }, [dataList]);

  useEffect(() => {
    const dataList = JSON.parse(localStorage.getItem("list"));
    if (dataList) {
      setDataList(dataList);
    }
  }, []);

  return (
    <>
      <div className="container">
        <h1>Todo App</h1>
        <Form handleSubmit={handleSubmit} data={data} setData={changeData} />
        {isFilterClicked
          ? filterList.map((item) => {
              return (
                <>
                  <div className="container todo d-flex justify-content-between">
                    <div className="form-check py-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={item.isCompleted}
                        onChange={() => handleCheck(item.id)}
                      />
                      <label
                        className="form-check-label d-flex "
                        key={item.toString()}
                      >
                        {item.id === edit ? (
                          <>
                            <input
                              type="text"
                              defaultValue={item.name}
                              autoFocus
                              onChange={handleFilterEdit}
                              onBlur={blurChange}
                            ></input>
                          </>
                        ) : (
                          <>{item.name}</>
                        )}
                      </label>
                    </div>
                    <div>
                      {item.isCompleted ? (
                        <div id="badge" className="float-end ">
                          <span className="badge bg-secondary d-flex justify-content-end mt-3">
                            Completed
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      <i
                        className="fas fa-edit mx-4"
                        onClick={() => editFilterList(item.id)}
                      ></i>
                      <i
                        className="fas fa-trash-alt mt-3"
                        onClick={() => deleteFilterList(item.id)}
                      ></i>
                    </div>
                  </div>
                </>
              );
            })
          : dataList.map((item) => {
              return (
                <>
                  <div className="container todo d-flex justify-content-between">
                    <div className="form-check py-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={item.isCompleted}
                        onChange={() => handleCheck(item.id)}
                      />
                      <label
                        className="form-check-label d-flex"
                        key={item.toString()}
                      >
                        {item.id === edit ? (
                          <>
                            <input
                              type="text"
                              defaultValue={item.name}
                              autoFocus
                              onChange={handleEdit}
                              onBlur={blurChange}
                            ></input>
                          </>
                        ) : (
                          <>{item.name}</>
                        )}
                      </label>
                    </div>
                    <div>
                      {item.isCompleted ? (
                        <div id="badge" className="float-end ">
                          <span className="badge bg-secondary d-flex justify-content-end mt-3">
                            Completed
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      <i
                        className="fas fa-edit mx-4"
                        onClick={() => editList(item.id)}
                      ></i>
                      <i
                        className="fas fa-trash-alt mt-3"
                        onClick={() => deleteList(item.id)}
                      ></i>
                    </div>
                  </div>
                </>
              );
            })}
        {BUTTON_TYPE.map((value) => {
          return <Button title={value.title} buttonList={buttonList} />;
        })}
      </div>
    </>
  );
};

export default Todo;
