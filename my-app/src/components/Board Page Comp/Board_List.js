import { useState, useRef, useContext } from "react";
import { User_Context } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/App";
import List from "./List";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ListService from "../../services/listService";
import CardService from "../../services/cardService";

const Create_List = () => {
  const User = useContext(User_Context);

  const [list_visibility, set_list_visibility] = useState("hidden");
  const [create_list_visibility, set_create_list_visibility] =
    useState("visible");

  const [list_name, set_list_name] = useState("");

  const create_list = useRef(null);
  const create_list_overlay = useRef(null);

  const create_board_list = () => {
    set_list_visibility("visible");
    set_create_list_visibility("hidden");
  };

  const handleClickOutside = (e) => {
    if (
      create_list_overlay.current &&
      !create_list_overlay.current.contains(e.target) &&
      !create_list.current.contains(e.target)
    ) {
      set_list_visibility("hidden");
      set_create_list_visibility("visible");
    }
  };
  document.addEventListener("click", handleClickOutside);

  const create_list_component = () => {
    const random_number = Math.floor(Math.random() * 100);
    const list = {
      id: {
        user_id: User.user_id,
        "boards.board_id": User.single_board_info[0].board_id,
      },
      board_lists: {
        $push: {
          "boards.$.board_lists": {
            unique_id: "L-" + random_number,
            name: list_name,
            cards: [],
          },
        },
      },
    };
    ListService.create_board_list(list);
    User.set_single_board_info([
      {
        ...User.single_board_info[0],
        board_lists: [
          ...User.single_board_info[0].board_lists,
          { unique_id: "L-" + random_number, name: list_name, cards: [] },
        ],
      },
    ]);
    set_list_name("");
  };

  // const reorder = (list, startIndex, endIndex) => {
  // const result = Array.from(list);
  // const [removed] = result.splice(startIndex, 1);
  // result.splice(endIndex, 0, removed);

  // return result;
  // };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    if (result.type === "doppableItem") {
      const remove_list_info = {
        list_id: {
          user_id: User.user_id,
          "boards.board_id": User.single_board_info[0].board_id,
        },
        lists: {
          $pull: { "boards.$.board_lists": { unique_id: result.draggableId } },
        },
      };
      ListService.remove_list_from_board(remove_list_info);
      const items = Array.from(User.single_board_info[0].board_lists);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      const add_card_info = {
        list_id: {
          user_id: User.user_id,
          "boards.board_id": User.single_board_info[0].board_id,
        },
        lists: {
          $push: {
            "boards.$.board_lists": {
              $each: [
                {
                  unique_id: reorderedItem.unique_id,
                  name: reorderedItem.name,
                  cards: reorderedItem.cards,
                },
              ],
              $position: result.destination.index,
            },
          },
        },
      };
      ListService.add_list_to_board_at_position(add_card_info);
      User.set_single_board_info([
        {
          ...User.single_board_info[0],
          board_lists: [...items],
        },
      ]);
    } else if (result.type === "droppableSubItem") {
      const itemSubItemMap = User.single_board_info[0].board_lists.reduce(
        (result, item) => {
          result[item.unique_id] = item;
          return result;
        },
        {}
      );

      const sourceParentId = result.source.droppableId;
      const destinationParentId = result.destination.droppableId;
      const sourceSubItems = itemSubItemMap[sourceParentId];
      const destinationSubItems = itemSubItemMap[destinationParentId];

      let newItems = [...User.single_board_info[0].board_lists];

      if (sourceParentId === destinationParentId) {
        const list_index = newItems.findIndex(
          (item) => item.unique_id === sourceParentId
        );
        const remove_card_info = {
          list_id: {
            user_id: User.user_id,
          },
          cards: {
            $pull: { "boards.$[i].board_lists.$[j].cards": { id: result.draggableId } },
          },
          filter: {
            arrayFilters: [
              {
                "i.board_id": User.single_board_info[0].board_id,
              },
              {
                "j.unique_id": result.source.droppableId,
              },
            ],
          },
        };
        CardService.remove_card_from_list(remove_card_info);
        const items = Array.from(
          User.single_board_info[0].board_lists[list_index].cards
        );
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const add_card_info = {
          list_id: {
            user_id: User.user_id,
          },
          cards: {
            $push: {
              "boards.$[i].board_lists.$[j].cards": {
                $each: [{ id: result.draggableId, name: reorderedItem.name }],
                $position: result.destination.index,
              },
            },
          },
          filter: {
            arrayFilters: [
              {
                "i.board_id": User.single_board_info[0].board_id,
              },
              {
                "j.unique_id": result.source.droppableId,
              },
            ],
          }
        };
        CardService.add_card_to_list_at_position(add_card_info);
        User.set_single_board_info([
          {
            ...User.single_board_info[0],
            board_lists: [
              ...User.single_board_info[0].board_lists.slice(0, list_index),
              {
                ...User.single_board_info[0].board_lists[list_index],
                cards: items,
              },
              ...User.single_board_info[0].board_lists.slice(list_index + 1),
            ],
          },
        ]);
      } else {
        let newSourceSubItems = [...sourceSubItems.cards];

        const [draggedItem] = newSourceSubItems.splice(result.source.index, 1);

        let newDestSubItems = [...destinationSubItems.cards];

        newDestSubItems.splice(result.destination.index, 0, draggedItem);

        const source_list_index = newItems.findIndex(
          (item) => item.unique_id === sourceParentId
        );

        const dest_list_index = newItems.findIndex(
          (item) => item.unique_id === destinationParentId
        );

        console.log(result.source.droppableId);

        const remove_card_info = {
          list_id: {
            user_id: User.user_id,
          },
          cards: {
            $pull: { "boards.$[i].board_lists.$[j].cards": { id: result.draggableId } },
          },
          filter: {
            arrayFilters: [
              {
                "i.board_id": User.single_board_info[0].board_id,
              },
              {
                "j.unique_id": result.source.droppableId,
              },
            ]
          }
        };
        CardService.remove_card_from_list(remove_card_info);

        const add_card_info = {
          list_id: {
            user_id: User.user_id,
          },
          cards: {
            $push: {
              "boards.$[i].board_lists.$[j].cards": {
                $each: [{ id: result.draggableId, name: draggedItem.name }],
                $position: result.destination.index,
              },
            },
          },
          filter: {
            arrayFilters: [
              {
                "i.board_id": User.single_board_info[0].board_id,
              },
              {
                "j.unique_id": result.destination.droppableId,
              },
            ]
          }
        };
        CardService.add_card_to_list_at_position(add_card_info);

        if (source_list_index < dest_list_index) {
          User.set_single_board_info([
            {
              ...User.single_board_info[0],
              board_lists: [
                ...User.single_board_info[0].board_lists.slice(
                  0,
                  source_list_index
                ),
                {
                  ...User.single_board_info[0].board_lists[source_list_index],
                  cards: [
                    ...User.single_board_info[0].board_lists[
                      source_list_index
                    ].cards.slice(0, result.source.index),
                    ...User.single_board_info[0].board_lists[
                      source_list_index
                    ].cards.slice(result.source.index + 1),
                  ],
                },
                ...User.single_board_info[0].board_lists.slice(
                  source_list_index + 1,
                  dest_list_index
                ),
                {
                  ...User.single_board_info[0].board_lists[dest_list_index],
                  cards: newDestSubItems,
                },
                ...User.single_board_info[0].board_lists.slice(
                  dest_list_index + 1
                ),
              ],
            },
          ]);
        } else {
          User.set_single_board_info([
            {
              ...User.single_board_info[0],
              board_lists: [
                ...User.single_board_info[0].board_lists.slice(
                  0,
                  dest_list_index
                ),
                {
                  ...User.single_board_info[0].board_lists[dest_list_index],
                  cards: newDestSubItems,
                },
                ...User.single_board_info[0].board_lists.slice(
                  dest_list_index + 1,
                  source_list_index
                ),
                {
                  ...User.single_board_info[0].board_lists[source_list_index],
                  cards: [
                    ...User.single_board_info[0].board_lists[
                      source_list_index
                    ].cards.slice(0, result.source.index),
                    ...User.single_board_info[0].board_lists[
                      source_list_index
                    ].cards.slice(result.source.index + 1),
                  ],
                },
                ...User.single_board_info[0].board_lists.slice(
                  source_list_index + 1
                ),
              ],
            },
          ]);
        }
      }
    }
  }

  if (
    User.multiple_board_info.length === 0 ||
    User.single_board_info.length === 0
  ) {
    return <div id="menu-overlay">Loading...</div>;
  }

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable
          droppableId="board-lists-container"
          direction="horizontal"
          type="doppableItem"
        >
          {(provided, snapshot) => (
            <div
              id="board-lists-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {User.single_board_info[0].board_lists.map((board, index) => {
                return (
                  <Draggable
                    key={board.unique_id}
                    draggableId={board.unique_id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <List
                        id={board.unique_id}
                        name={board.name}
                        key={index}
                        index={index}
                        ref={provided.innerRef}
                        draggableProps={{ ...provided.draggableProps }}
                        handleProps={{ ...provided.dragHandleProps }}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div id="create-list-container">
        <div
          id="create-list"
          onClick={create_board_list}
          style={{ visibility: create_list_visibility }}
          ref={create_list}
        >
          + create list
        </div>
        <div
          id="create-list-overlay"
          style={{ visibility: list_visibility }}
          ref={create_list_overlay}
        >
          <input
            className="create-list-input"
            type="text"
            placeholder="Enter list title"
            value={list_name}
            onChange={(e) => set_list_name(e.target.value)}
          />
          <button id="create-list-button" onClick={create_list_component}>
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default Create_List;
