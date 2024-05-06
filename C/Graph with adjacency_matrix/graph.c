//Name: Venkata Pratyush Kodavanti
//G-Number: G01225485

#include<stdio.h>
#include<stdlib.h>
#include<string.h>

#include "graph.h"

void graph_has_path_helper(Graph *graph, int v1,int *queue, int *front, int *rear);

Graph *graph_initialize()
{
  Graph *new_graph = malloc(sizeof(Graph));
  if(new_graph==NULL)
  {
   return NULL;
  }
 new_graph->max_vertex = 3456574;
 if(new_graph->adj_matrix!=NULL)
 {
  for(int i =0; i<MAX_VERTICES; i++)
  { 
   for(int j=0; j<MAX_VERTICES; j++)
   {
     new_graph->adj_matrix[i][j] =-1;
   }
  }
  for(int i =0; i<MAX_VERTICES; i++)
  {
   new_graph->visited[i]=0;
  }
 return new_graph;
 }
return NULL;
}


int graph_add_vertex(Graph *graph, int v1)
{
 if((graph!=NULL) && (graph->adj_matrix!=NULL) && (v1>=0) && (v1<MAX_VERTICES))
 {
   if(graph->adj_matrix[v1][v1]!=-1)
   {
   return 0;
   }
   else
   {
   graph->adj_matrix[v1][v1] = 0;
   return 0;
   }
 } 
 return -1;
} 

int graph_contains_vertex(Graph *graph, int v1)
{
 if((graph!=NULL) && (graph->adj_matrix!=NULL) && (v1>=0) && (v1<MAX_VERTICES))
 {
  return 1;
 }
 return 0;
}

int graph_remove_vertex(Graph *graph, int v1)
{
  if((graph!=NULL) && (graph->adj_matrix!=NULL) && (v1>=0) && (graph_contains_vertex(graph, v1)))
 {
  if(graph->adj_matrix[v1][v1]==-1)
  {
     return 0;
  }
  else
  {
    for(int i =0; i<MAX_VERTICES; i++)
    {
     graph->adj_matrix[v1][i]=-1;
     graph->adj_matrix[i][v1]=-1;
    }
   return 0;
   }
 }
 return -1;
}
int graph_add_edge(Graph *graph, int v1,int v2, int wt)
{
  if((graph!=NULL) && (graph->adj_matrix!=NULL) && (graph_contains_vertex(graph,v1)) && (graph_contains_vertex(graph,v2)) && wt>0)
 {
   graph->adj_matrix[v1][v2]= wt;
   return 0;
 }
 return -1;
}

int graph_contains_edge(Graph *graph, int v1, int v2)
{
 if((graph!=NULL) && (graph->adj_matrix!=NULL) && (graph_contains_vertex(graph,v1)) && (graph_contains_vertex(graph,v2)))
 {
  if(graph->adj_matrix[v1][v2]>0)
  {
   return 1;
  }
 }
  return 0;
}

int graph_remove_edge(Graph *graph, int v1, int v2)
{
 if((graph!=NULL) && (graph->adj_matrix!=NULL) && (graph_contains_vertex(graph, v1)) && (graph_contains_vertex(graph,v2)))
 {
  if(v1==v2)
  {
   graph->adj_matrix[v1][v2] = 0;
  }
  else
  {
   graph->adj_matrix[v1][v2]=-1;
  }
  return 0;
 }
 return -1;
}

int graph_num_vertices(Graph *graph)
{
 if(graph!=NULL && graph->adj_matrix!=NULL)
 {
   int count =0;
   for (int i=0; i<MAX_VERTICES; i++)
   {
     if(graph->adj_matrix[i][i] >=0)
     {
      count++;
     }
   return count;
   }
 }
 return-1;
}

int graph_num_edges(Graph *graph)
{
 if((graph!=NULL) && (graph->adj_matrix!=NULL)) 
 {
  int count =0;
  for(int i =0; i<MAX_VERTICES; i++)
  {
   for(int j=0; j<MAX_VERTICES; j++)
   {
    if(graph->adj_matrix[i][j]>=0)
    {
     count++;
    }
   }
  }
  return count;
 }
 return -1;
}


int graph_total_weight(Graph *graph)
{
 if((graph!=NULL)&& (graph->adj_matrix!=NULL))
 {
  int weight=0;
  for(int i =0; i<MAX_VERTICES; i++)
  {
   for(int j=0; j<MAX_VERTICES; j++)
   {
    if(graph->adj_matrix[i][j]>0)
    {
      weight+= graph->adj_matrix[i][j];
    }
   }
  } 
  return weight; 
 }
 return -1;
}


int graph_get_degree(Graph *graph, int v1)
{
 if(graph!=NULL && graph->adj_matrix!=NULL && graph_contains_vertex(graph, v1))
 {
  int degree =0;
  for(int i=0; i<MAX_VERTICES; i++)
  {
   if(graph->adj_matrix[i][v1]>=0)
   {
     degree++;
   }
   else if(graph->adj_matrix[v1][i]>=0)
   {
    degree++;
   }
  } 
  return degree;
 }
 return-1;
}

int graph_get_edge_weight(Graph *graph, int v1,int v2)
{
  if(graph!=NULL && graph->adj_matrix!=NULL && graph_contains_vertex(graph, v1) && graph_contains_vertex(graph, v2))
  {
    return graph->adj_matrix[v1][v2];;
  }
  return -1;
}

int graph_is_neighbour(Graph *graph, int v1, int v2)
{
  if(graph!=NULL && graph->adj_matrix!=NULL && graph_contains_vertex(graph, v1) && graph_contains_vertex(graph, v2)) 
  {
  if(graph->adj_matrix[v1][v2]>=0 || graph->adj_matrix[v2][v1]>=0)
  {
   return 1;
   }
  }
   return 0;
} 

int *graph_get_predecessors(Graph *graph, int v1)
{
  if(graph!=NULL && graph->adj_matrix!=NULL && graph_contains_vertex(graph, v1))
  {
   int *predecessor_list = malloc(sizeof(int)*MAX_VERTICES);
   if(predecessor_list!=NULL)
   {
    for(int i=0; i<MAX_VERTICES; i++)
    {
     predecessor_list[i]=-1;
    }
    int j=0;
    for(int i=0 ; i<MAX_VERTICES;i++)
    {
     if((graph->adj_matrix[i][v1]>=0)&&j<MAX_VERTICES)
     {
      predecessor_list[j]=i;
      j++;
     }
    }
   return predecessor_list;
  }
  return NULL;
 } 
 return NULL;
}

int *graph_get_sucessors(Graph *graph, int v1)
{
  if(graph!=NULL && graph->adj_matrix!=NULL && graph_contains_vertex(graph,v1))
  {
  int *sucessor_list = malloc(sizeof(int)*MAX_VERTICES);
  if(sucessor_list!=NULL)
  {
   for(int i=0 ; i<MAX_VERTICES;i++)
   {
    sucessor_list[i]=-1;
   }
   int j=0;
   for(int i=0 ; i<MAX_VERTICES;i++)
   {
     if((graph->adj_matrix[v1][i]>=0)&&(j<MAX_VERTICES))
     {
      sucessor_list[j]=i;
      j++;
     }
   }
   return sucessor_list;
  }
  return NULL;
 }
 return NULL;
}


int graph_has_path(Graph *graph, int v1, int v2)
{
  if(graph!=NULL && graph->adj_matrix!=NULL && v1>=0 && graph_contains_vertex(graph, v1)&& graph_contains_vertex(graph, v2))
  {
    if(v1==v2)
    {
     return 1;
    }
    int front =0, rear =-1;
    int queue[MAX_VERTICES]={0};
    graph_has_path_helper(graph, v1, queue, &front, &rear);
    if(graph->visited[v2]==1)
    {
     return 1; 
    }
  }
 return 0;
}

void graph_has_path_helper(Graph *graph, int v1,int *queue, int *front, int *rear)
{
     for(int i=0; i<MAX_VERTICES; i++)
     {
       if(graph->adj_matrix[v1][i]>0 && graph->visited[i]==0)
       {
         (*rear)+=1;
         queue[*rear]=i;
       }
     }
    if((*front)<= (*rear))
    {
      graph->visited[queue[(*front)]]=1;
      (*front) +=1;
      graph_has_path_helper(graph,queue[(*front)-1],queue, front, rear);
    }
  return;
}

void graph_print(Graph *graph)
{
 printf("\nAdjacency matrix\n");
 printf("   ");
 for (int i = 0; i < MAX_VERTICES; i++)
 {
   printf("%.2d ", i);
 }
 printf("\n");
 for (int i = 0; i < MAX_VERTICES; i++)
 {
  printf("---");
 }
 printf("\n");
 for (int r = 0; r < MAX_VERTICES; r++)
 {
  printf("%.2d| ", r);
  for (int c = 0; c < MAX_VERTICES; c++)
  {
   if(graph->adj_matrix[r][c] == -1)
   {
    printf(" . ");
   } 
   else
   {
    printf("%.2d ", graph->adj_matrix[r][c]);
   }
  }
 printf("\n");
 }
}  

int graph_load_file(Graph *graph, char *filename)
{
 FILE *fp =NULL;
 if(graph!=NULL && filename!=NULL)
 {
  fp=fopen(filename,"r");
  if(fp!=NULL)
  {
   int v1;
   int v2;
   int wt;
   char buffer[FILE_ENTRY_MAX_LEN] ="";
    while(fgets(buffer,FILE_ENTRY_MAX_LEN,fp)) 
    {
      char *tok=(strtok(buffer,","));
      v1=atoi(tok);
      graph_add_vertex(graph,v1);
      tok=strtok(NULL,",");
      if(tok!=NULL)
      {
       v2=atoi(tok);
       graph_add_vertex(graph,v2);
       tok=strtok(NULL,",");
       if(tok!=NULL);
       {
         wt = atoi(tok);
        graph_add_edge(graph, v1, v2, wt);
       }
      }
     }
     fclose(fp);
     return 0;
   }
  }
 return -1;
}
  
void graph_output_dot(Graph *graph, char *filename)
{
  if(graph!=NULL && graph->adj_matrix!=NULL)
 {
  FILE *fp=NULL;
  fp = fopen(filename, "w");
  if(fp!=NULL)
  {
    fprintf(fp,"digraph { \n");
    for(int i=0; i<MAX_VERTICES; i++)
    {
      for(int j=0; j<MAX_VERTICES;j++)
      {
       if(graph->adj_matrix[i][j]>0)
        {
         fprintf(fp,"%d -> %d [label = %d];\n",i,j,graph->adj_matrix[i][j]);
        }
       else if((i==j) && (graph->adj_matrix[i][j]==0))
       {
        fprintf(fp,"%d; \n",i);
       }
      }
    }
   fprintf(fp,"}");
   fclose(fp);
   return;
  }
  return;
 }
  return;
}


int graph_save_file(Graph *graph, char *filename)
{
 if(graph!=NULL && graph->adj_matrix!=NULL)
 {
  FILE *fp=NULL;
  fp = fopen(filename, "w");
  if(fp!=NULL)
  {
    for(int i=0; i<MAX_VERTICES; i++)
    {
      for(int j=0; j<MAX_VERTICES;j++)
      {
       if(graph->adj_matrix[i][j]>0)
        {
         fprintf(fp,"%d,%d,%d\n",i,j,graph->adj_matrix[i][j]);
        }
       else if((i==j) && (graph->adj_matrix[i][j]==0))
       {
        fprintf(fp,"%d \n",i);
       }
      }
    }
   fclose(fp); 
   return 0;
  } 
  return -1;
 }
 return -1;
}




int main()
{
 Graph *new_graph = graph_initialize();
 int b= graph_load_file(new_graph,"sample1.txt");
 if(b==0)
 {
  graph_print(new_graph);
 }
 int ret =graph_has_path(new_graph,0,15);
 if(ret)
 {
  printf("\n The graph has path from the given vertices \n");
 }
 graph_output_dot(new_graph,"sample3.txt");
 return 0;
}
