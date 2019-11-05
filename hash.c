/* Fill in your Name and GNumber in the following two comment fields
 * Name:
 * GNumber:
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "node.h"
#include "hash.h"

/* (IMPLEMENT THIS FUNCTION)
 * In this function, you will create a new Symtab struct.
 * Follow the Directions in the Project Documentation for this Function
 * Return the pointer to the new symtab.
 * On any memory errors, return NULL
 */
Symtab *hash_initialize() {
  /* Implement this function */
  Symtab *dummy_node= malloc(sizeof(Symtab));
  Symbol **array_table_add = malloc(sizeof(Symbol*)*HASH_TABLE_INITIAL);
  if(dummy_node ==NULL || array_table_add==NULL)
  {
   return NULL;
  }
  dummy_node->size = 0;
  dummy_node->capacity = HASH_TABLE_INITIAL;
  dummy_node->table = array_table_add;
  for(int i=0; i<HASH_TABLE_INITIAL<i++)
  {
	  (*array_table_add)[i] = NULL;
  }
  return dummy_node;
 
}
/* (IMPLEMENT THIS FUNCTION)
 * Destroy your Symbol Table.
 * Follow the Directions in the Project Documentation for this Function
 * Return on any memory errors.
 */
void hash_destroy(Symtab *symtab) {
  /* Implement this function */
  if(symtab ==NULL || symtab->table)
  {
  return;
  }
  int i;
  int size = symtab->capacity;
  Symbol **table_walker = symtab->table;
  Symbol *walker= NULL;
  Symbol *reaper = NULL;
  for(i=0; i<size; i++)
  {
	  if(walker!=NULL)
	  {
		walker = *table_walker[i];
		while(walker!=NULL)
		{
			reaper= walker;
			walker= walker->next;
			free(reaper);
			reaper=NULL:
		}
        free(walker);
		walker = NULL;
	  }
	  free((*table_walker)[i]);
	  *table_walker[i]=NULL;
  }
} 

/* (IMPLEMENT THIS FUNCTION)
 * Return the capacity of the table inside of symtab.
 * If symtab is NULL, return -1;
 */
int hash_get_capacity(Symtab *symtab) {
  /* Implement this function */
  return -1;
}

/* (IMPLEMENT THIS FUNCTION)
 * Return the number of used indexes in the table (size) inside of symtab.
 * If symtab is NULL, return -1;
 */
int hash_get_size(Symtab *symtab) {
  /* Implement this function */
  return -1;
}

/* (IMPLEMENT THIS FUNCTION)
 * Adds a new Symbol to the symtab via Hashing.
 * Follow the Directions in the Project Documentation for this Function
 * If symtab is NULL, there are any malloc errors, or if any rehash fails, return -1;
 * Otherwise, return 0;
 */
int hash_put(Symtab *symtab, char *var, int val) {
  /* Implement this function */
  return 0;
}

/* (IMPLEMENT THIS FUNCTION)
 * Gets the Symbol for a variable in the Hash Table.
 * Follow the Directions in the Project Documentation for this Function
 * On any NULL symtab or memory errors, return NULL
 */
Symbol *hash_get(Symtab *symtab, char *var) {
  /* Implement this function */
  return NULL;
}

/* (IMPLEMENT THIS FUNCTION)
 * Doubles the size of the Array in symtab and rehashes.
 * Follow the Directions in the Project Documentation for this Function
 * If there were any memory errors, set symtab->array to NULL
 * If symtab is NULL, return immediately.
 */
void hash_rehash(Symtab *symtab, int new_capacity) {
  /* Implement this function */
  return;
}

/* Implemented for you.
 * Provided function to print the symbol table */
void hash_print_symtab(Symtab *symtab) {
  if(symtab == NULL) {
    return;
  }
  printf("|-----Symbol Table [%d size/%d cap]\n", symtab->size, symtab->capacity);

  int i = 0;
  Symbol *walker = NULL;

  /* Iterate every index, looking for symbols to print */
  for(i = 0; i < symtab->capacity; i++) {
    walker = symtab->table[i];
    /* For each found linked list, print every symbol therein */
    while(walker != NULL) {
      printf("| %10s: %d \n", walker->variable, walker->val);
      walker = walker->next;
    }
  }
  return;
}

/* This function is written for you.
 * This computes the hash function for a String
 */
long hash_code(char *var) {
  long code = 0;
  int i;
  int size = strlen(var);

  for(i = 0; i < size; i++) {
    code = (code + var[i]);
    if(size == 1 || i < (size - 1)) {
      code *= 128;
    }
  }

  return code;
}
