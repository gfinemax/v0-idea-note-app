"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function IdeaCard({ idea, onEdit, onDelete }) {
  const handleDelete = () => {
    if (confirm("정말로 이 아이디어를 삭제하시겠습니까?")) {
      onDelete(idea.id)
    }
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2 text-balance">{idea.title}</CardTitle>
        <div className="text-sm text-muted-foreground">{idea.createdAt}</div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-foreground leading-relaxed flex-1 line-clamp-4 text-pretty">{idea.content}</p>
        
        {/* 태그 표시 */}
        {idea.tags && idea.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {idea.tags.map((tag, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-4 pt-3 border-t border-border">
          <Button variant="outline" size="sm" onClick={() => onEdit(idea)} className="flex-1">
            ✏️ 수정
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="flex-1 text-destructive hover:text-destructive-foreground hover:bg-destructive bg-transparent"
          >
            🗑️ 삭제
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
