/* Fill in your Name and GNumber in the following two comment fields
 * Name: Kodavanti Venkata Pratyush
 * GNumber: G01225485
 */



#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "clock.h"
#include "structs.h"
#include "constants.h"
#include "schedule.h"

/* Schedule Count
 * - Return the number of Processes in the list.
 */
int schedule_count( Process* list)
{
	int count =0;
	Process *walker = list;  //assigning the address of the head of the linked to walker.

	while(walker!=NULL)
	{
		walker= walker->next;         //assigns walker next value to walker.
		count++;              // increment count just as to keep track of number of elements parsed
	}
	return count;                //returns the value of count.
}

/* Schedule Insert
 * - Insert the Process into the List with the Following Constraints
 *   list is a pointer to the head pointer for a singly linked list.
 *   It may begin as NULL
 *   1) Insert in the order of Ascending PIDs
 *   (eg. 1, 13, 14, 20, 32, 55)
 * Remember to set list to the new head if it changes!
 */
void schedule_insert(Process **list, Process *node)
{
	Process *walker = NULL;
	if(node!=NULL)                              //check if the node is null
	{
		if(((*list) == NULL)|| ((*list)->pid > node->pid))  // if head is null or pid of the node is greater than the pid of the head
		{
			node->next = (*list);		 // node next contains the value of the current head.
			*list = node;               // node is new head and node next contains the address of existing head.
			return;                    //returns after inserting the node
		}
		else
		{
			for(walker = *list;walker!=NULL; walker=walker->next)
			{
				if(walker->next!=NULL)
				{
					if(walker->next->pid > node->pid)       // inserting the new node in between 2 existing nodes.
					{
						node->next = walker->next;
						walker->next = node;
						return;               // return after inserting the node.
					}
				}
				else                     
				{
					node->next = walker->next;
					walker->next = node;
					return;                  //returns after inserting the node
				}
			}
		}
	}
	else
	{
		printf("Node is NULL \n");
	}
	return;          // returns if the node is null.
}




/* Schedule Generate
 * - Allocate the Memory and Create the Process from the given Variables
 *   Remember to initialize all values, including next!
 */

Process *schedule_generate(const char * name, int pid, int time_remaining, int time_last_run)
{
	Process * new = NULL;
        new = malloc(sizeof(Process));                     // creating a new struct using malloc
	new->next = NULL;                                  //setting the address of the next to null.
	if(new == NULL)                                    // checking if the there is an error in creating the node. 
	{
		printf("there is an error in creating the struct \n");
	}
        else                                              // if the node is created properly then assign the values.
       {
		strncpy(new->name, name, strlen(name)+1);
		new->pid=pid;
		new->time_remaining = time_remaining;
		new->time_last_run = time_last_run;
       }
       return new;               //returns the address of the new node.
}



/* Schedule Select
 * - Select the next Process to be run using the following conditions:
 *   1) The Process with the lowest time_remaining should run next.
 *   - If there are any ties, select the Process with the lowest PID
 *   2) If there is a Process that has not run in >= TIME_STARVATION, then
 *      select that one instead.
 *      (Use the function clock_get_time() to get the current time)
 *   - If there are any ties, select the Process with the lowest PID
 *   3) If the list is NULL, return NULL
 * - Remove the selected Process from the list
 * - Return the selected Process
 */

Process *schedule_select(Process ** list)
{
	Process *previous = NULL;                                    //stores the address of previous node of walker.
	Process *walker = (*list);
	Process *node_selected = NULL;
	Process *node_min_time = *list;
	Process *prev_node_min_time = NULL;                          // stores the address of previous node of node_min_time

	for(;walker!=NULL; previous=walker, walker=walker->next)
	{
		if((clock_get_time() - walker->time_last_run) >= TIME_STARVATION)           // checking for time starvation for every node.
		{
			node_selected = walker;
			if(walker->next == NULL)                                               //if the node staring is at the end of the list or is the 1st element of the list.
			{
				previous->next =NULL;
			}
			else                                                                  // assigning the address of walker next to previous next.
			{
				if(previous!=NULL)
				{
				previous->next = walker->next;
			    }
			}
			return node_selected;                         //returns the node which is in starvation.
		}
		else                                                           //if no node is in time starvation then checking for node with minimum time remaining.
		{
			if((walker->next!=NULL)&&(node_min_time->time_remaining > walker->next->time_remaining))
			{
				prev_node_min_time = walker;
				node_min_time = walker->next;

			}
			else if((walker->next!=NULL)&&(node_min_time->time_remaining == walker->next->time_remaining)) // if two process have same minimum time remaining then comparing pids
			{
				if(node_min_time->pid > walker->next->pid)
				{
					prev_node_min_time = walker;          
					node_min_time = walker->next;
				}
			}
			node_selected = node_min_time;
		}
	}
	if((node_selected == (*list))&&((*list)->next!=NULL))          //if the node with minimum time remaining is head of the list and there are more than 1 element in the list.
	{
		*list = node_selected->next;
	}
	else if((node_selected==(*list)) &&((*list)->next==NULL)) // if there is only one element in the list.
	{
		*list = NULL;
	}
	else
	{
		prev_node_min_time->next = node_selected->next;
	}
	return node_selected;                                     //returns the node with minimum time remaining.
}




/* Schedule Terminate
 * - Unallocate the Memory for the given Node
 */
void schedule_terminate(Process * node)
{
	free(node);                    //frees the address linked to the node.
	node = NULL;                  // setting the node to null to avoid accessing memeory which is not in scope of the program.
}

