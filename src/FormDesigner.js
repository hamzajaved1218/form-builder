import React, { useEffect, useState } from "react";

const FormDesigner = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");

  const [option, setOption] = useState("");
  const [max, setMax] = useState("");
  const [fields, setFields] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [mode, setMode] = useState("add");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleteAllConfirmation, setShowDeleteAllConfirmation] =
    useState(false);

  useEffect(() => {
    const storedFields = localStorage.getItem("formFields");
    if (storedFields) {
      setFields(JSON.parse(storedFields));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formFields", JSON.stringify(fields));
  }, [fields]);

  useEffect(() => {
    const storedShowForm = localStorage.getItem("showForm");
    if (storedShowForm) {
      setShowForm(JSON.parse(storedShowForm));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showForm", JSON.stringify(showForm));
  }, [showForm]);

  const handleShowFormChange = () => {
    setShowForm(!showForm);
  };

  const handleEdit = (rowIndex) => {
    setSelectedRow(rowIndex);
    setMode("edit");
    const { name, option, max } = fields[rowIndex];
    setName(name);
    setOption(option);
    setMax(max);
    setShowForm(true);
  };

  const handleDelete = (rowIndex) => {
    setShowDeleteConfirmation(true);
    setSelectedRow(rowIndex);
  };

  const handleDeleteConfirmation = () => {
    const updatedFields = [...fields];
    updatedFields.splice(selectedRow, 1);
    setFields(updatedFields);
    setSelectedRow(null);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
    setSelectedRow(null);
  };

  const handleDeleteAll = () => {
    setShowDeleteAllConfirmation(true);
  };

  const handleDeleteAllConfirmation = () => {
    setFields([]);
    localStorage.removeItem("formFields");
    setShowDeleteAllConfirmation(false);
  };

  const handleDeleteAllCancel = () => {
    setShowDeleteAllConfirmation(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && (option || mode !== "option")) {
      const newField = {
        name,
        option,
      };

      if (mode === "add") {
        const createdFields = [...fields, newField];
        setFields(createdFields);
      } else if (mode === "edit" && selectedRow !== null) {
        const updatedFields = [...fields];
        updatedFields[selectedRow] = newField;
        setFields(updatedFields);
        setSelectedRow(null);
        setMode("add");
      }

      setName("");
      setOption("");
      setMax("");
      setShowForm(false);
    }
  };

  const handleReset = () => {
    setFields([]);
    setName("");

    setOption("");
    setMax("");
  };

  return (
    <div className="px-4">
      <h1 className="mx-0 mt-5 text-2xl font-semibold md:mx-96">
        Form Designer
      </h1>

      <div className="mx-0 mt-10 flex  gap-32 border bg-white shadow md:mx-96">
        <div>
          <div className="container mx-10 mt-10">
            <div className="mt-5">
              <label
                htmlFor="form_name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Form name
              </label>
              <input
                type="text"
                id="form_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 md:w-80"
                placeholder="John"
                required
              />
            </div>

            <div className="mt-5">
              <h1 className="mt-4 text-base font-semibold">Form Creator</h1>
            </div>

            <form id="nameForm" className="mt-5" onSubmit={handleSubmit}>
              <div className="mb-6">
                <div>
                  <label
                    htmlFor="nameInput"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="nameInput"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="John"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="countries"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Type
                  </label>
                  <select
                    id="countries"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                  >
                    <option defaultValue>Select type</option>
                    <option value="select">Select</option>
                    <option value="option">Option</option>
                    <option value="date">Date</option>
                    <option value="time">Time</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                    {/* Add more options */}
                  </select>
                </div>

                {(option === "select" ||
                  option === "option" ||
                  mode === "edit") && (
                  <div className="mt-5">
                    <label
                      htmlFor="optionInput"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Option
                    </label>
                    <input
                      type="text"
                      id="optionInput"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Enter options separated by comma"
                      onChange={(e) => setOption(e.target.value)}
                    />
                  </div>
                )}

                <div className="mb-4 mt-4 flex items-center">
                  <input
                    id="show-form"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    checked={showForm}
                    onChange={handleShowFormChange}
                  />
                  <label
                    htmlFor="show-form"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Show validation
                  </label>
                </div>

                {showForm && (
                  <div className="border p-2">
                    {
                      <div>
                        <div className="mb-4 flex items-center">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                          />
                          <label
                            htmlFor="default-checkbox"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Required
                          </label>
                        </div>

                        <div className="mb-6">
                          <div>
                            <label
                              htmlFor="maxInput"
                              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Max
                            </label>
                            <input
                              type="number"
                              id="maxInput"
                              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                              placeholder=""
                              value={max}
                              onChange={(e) => setMax(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor="minInput"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Min
                          </label>
                          <input
                            type="number"
                            id="minInput"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder=""
                          />
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor="maxLengthInput"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            MaxLength
                          </label>
                          <input
                            type="number"
                            id="maxLengthInput"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder=""
                          />
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor="patternInput"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Pattern
                          </label>
                          <input
                            type="text"
                            id="patternInput"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder=""
                          />
                        </div>
                      </div>
                    }
                  </div>
                )}

                <div className="mt-5">
                  <button
                    type="submit"
                    className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    {mode === "add" ? "Create" : "Update"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div>
          <div className="mt-3 text-base font-medium">Form Fields</div>
          <div className="relative mt-5 overflow-x-auto p-6 shadow-md sm:rounded-lg">
            {
              <div>
                <div class="pb-4">
                  <label for="table-search" class="sr-only">
                    Search
                  </label>
                  <div class="relative mt-1">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        class="h-4 w-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="table-search"
                      class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Search "
                    />
                  </div>
                </div>
                <div className="relative mt-5 overflow-x-auto p-6 shadow-md sm:rounded-lg">
                  <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-all-search"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                            />
                            <label
                              htmlFor="checkbox-all-search"
                              className="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fields.map((field, index) => (
                        <tr
                          key={index}
                          className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                        >
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input
                                id={`checkbox-table-search-${index}`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                              />
                              <label
                                htmlFor={`checkbox-table-search-${index}`}
                                className="sr-only"
                              >
                                checkbox
                              </label>
                            </div>
                          </td>
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {field.name}
                          </th>
                          <td className="flex gap-2 px-6 py-4">
                            <button
                              type="button"
                              className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                              onClick={() => handleEdit(index)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                              onClick={() => handleDelete(index)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            }
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              onClick={handleReset}
            >
              Reset
            </button>

            <button
              type="button"
              className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              onClick={handleDeleteAll}
            >
              Delete All
            </button>
          </div>
        </div>
      </div>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="rounded-lg bg-white p-6 shadow">
            <p className="text-lg font-medium">
              Are you sure you want to delete this item?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                onClick={handleDeleteConfirmation}
              >
                Delete
              </button>
              <button
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteAllConfirmation && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="rounded-lg bg-white p-6">
            <p className="text-lg font-medium">
              Are you sure you want to delete all items?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                onClick={handleDeleteAllConfirmation}
              >
                Delete All
              </button>
              <button
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                onClick={handleDeleteAllCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormDesigner;
